export default class SelectionCore {
  constructor(terminal, terminalContainer, settings = {}, options = {}) {
    this.terminal = terminal;
    this.terminalContainer = terminalContainer;
    this.settings = settings;

    this.options = {
      tapHoldDuration: 600,
      moveThreshold: 8,
      handleSize: 24,
      fingerOffset: 40,
      hapticFeedback: !!settings?.selectionHaptics,
      showContextMenu: true,
      zoomThrottle: 50,
      minFontSize: 8,
      maxFontSize: 48,
      onFontSizeChange: null,
      ...options,
    };

    this.options.minFontSize = Number(this.options.minFontSize) || 8;
    this.options.maxFontSize = Number(this.options.maxFontSize) || 48;
    if (this.options.minFontSize > this.options.maxFontSize) {
      [this.options.minFontSize, this.options.maxFontSize] = [
        this.options.maxFontSize,
        this.options.minFontSize,
      ];
    }
    if (typeof this.options.onFontSizeChange !== "function") {
      this.options.onFontSizeChange = (fontSize) => {
        this.terminal.options.fontSize = fontSize;
        this.terminal.refresh?.(0, this.terminal.rows - 1);
      };
    }

    this.isSelecting = false;
    this.isHandleDragging = false;
    this.selectionStart = null;
    this.selectionEnd = null;
    this.currentSelection = null;
    this.dragHandle = null;

    this.touchStartTime = 0;
    this.touchStartPos = { x: 0, y: 0 };
    this.initialTouchPos = { x: 0, y: 0 };
    this.tapHoldTimeout = null;

    this.isPinching = false;
    this.pinchStartDistance = 0;
    this.lastPinchDistance = 0;
    this.initialFontSize = 0;
    this.lastZoomTime = 0;

    this.selectionOverlay = null;
    this.startHandle = null;
    this.endHandle = null;
    this.contextMenu = null;
    this.contextMenuShouldStayVisible = false;

    this.cellDimensions = { width: 0, height: 0 };
    this.boundHandlers = {};

    this.wasFocusedBeforeSelection = false;
    this.selectionProtected = false;
    this.protectionTimeout = null;

    this.selectionChangeDisposable = null;
    this.resizeDisposable = null;

    this.init();
  }

  init() {
    this.createSelectionOverlay();
    this.createHandles();
    this.attachEventListeners();
    this.updateCellDimensions();
  }

  createSelectionOverlay() {
    this.selectionOverlay = document.createElement("div");
    this.selectionOverlay.className = "terminal-selection-overlay";
    this.selectionOverlay.style.pointerEvents = "none";
    this.terminalContainer.appendChild(this.selectionOverlay);
  }

  createHandles() {
    this.startHandle = this.createHandle("start");
    this.endHandle = this.createHandle("end");

    this.selectionOverlay.appendChild(this.startHandle);
    this.selectionOverlay.appendChild(this.endHandle);
  }

  createHandle(type) {
    const handle = document.createElement("div");
    handle.className = `terminal-selection-handle terminal-selection-handle-${type}`;
    handle.style.width = `${this.options.handleSize}px`;
    handle.style.height = `${this.options.handleSize}px`;
    handle.style.display = "none";
    handle.dataset.handleType = type;
    return handle;
  }

  attachEventListeners() {
    this.boundHandlers.terminalTouchStart =
      this.onTerminalTouchStart.bind(this);
    this.boundHandlers.terminalTouchMove = this.onTerminalTouchMove.bind(this);
    this.boundHandlers.terminalTouchEnd = this.onTerminalTouchEnd.bind(this);
    this.boundHandlers.selectionChange = this.onSelectionChange.bind(this);
    this.boundHandlers.terminalAreaTouchStart =
      this.onTerminalAreaTouchStart.bind(this);
    this.boundHandlers.handleTouchStart = this.onHandleTouchStart.bind(this);
    this.boundHandlers.handleTouchMove = this.onHandleTouchMove.bind(this);
    this.boundHandlers.handleTouchEnd = this.onHandleTouchEnd.bind(this);
    this.boundHandlers.orientationChange = this.onOrientationChange.bind(this);
    this.boundHandlers.terminalScroll = this.onTerminalScroll.bind(this);
    this.boundHandlers.terminalResize = this.onTerminalResize.bind(this);
    this.boundHandlers.documentTouchStart =
      this.onDocumentTouchStart.bind(this);

    this.terminal.element.addEventListener(
      "touchstart",
      this.boundHandlers.terminalTouchStart,
      { passive: false },
    );
    this.terminal.element.addEventListener(
      "touchmove",
      this.boundHandlers.terminalTouchMove,
      { passive: false },
    );
    this.terminal.element.addEventListener(
      "touchend",
      this.boundHandlers.terminalTouchEnd,
      { passive: false },
    );
    this.terminal.element.addEventListener(
      "touchstart",
      this.boundHandlers.terminalAreaTouchStart,
      { passive: false },
    );
    this.terminal.element.addEventListener(
      "scroll",
      this.boundHandlers.terminalScroll,
      { passive: true },
    );

    this.startHandle.addEventListener(
      "touchstart",
      this.boundHandlers.handleTouchStart,
      { passive: false },
    );
    this.startHandle.addEventListener(
      "touchmove",
      this.boundHandlers.handleTouchMove,
      { passive: false },
    );
    this.startHandle.addEventListener(
      "touchend",
      this.boundHandlers.handleTouchEnd,
      { passive: false },
    );

    this.endHandle.addEventListener(
      "touchstart",
      this.boundHandlers.handleTouchStart,
      { passive: false },
    );
    this.endHandle.addEventListener(
      "touchmove",
      this.boundHandlers.handleTouchMove,
      { passive: false },
    );
    this.endHandle.addEventListener(
      "touchend",
      this.boundHandlers.handleTouchEnd,
      { passive: false },
    );

    this.selectionChangeDisposable = this.terminal.onSelectionChange
      ? this.terminal.onSelectionChange(this.boundHandlers.selectionChange)
      : null;

    this.resizeDisposable = this.terminal.onResize
      ? this.terminal.onResize(this.boundHandlers.terminalResize)
      : null;

    window.addEventListener(
      "orientationchange",
      this.boundHandlers.orientationChange,
    );
    window.addEventListener("resize", this.boundHandlers.orientationChange);

    document.addEventListener(
      "touchstart",
      this.boundHandlers.documentTouchStart,
      { passive: true },
    );
  }

  onTerminalTouchStart(event) {
    if (event.touches.length === 2) {
      event.preventDefault();
      this.startPinchZoom(event);
      return;
    }

    if (event.touches.length !== 1) return;

    const touch = event.touches[0];
    this.touchStartTime = Date.now();
    this.touchStartPos = { x: touch.clientX, y: touch.clientY };
    this.initialTouchPos = { x: touch.clientX, y: touch.clientY };

    if (this.isSelecting) return;
    if (this.isEdgeGesture(touch)) return;

    if (this.tapHoldTimeout) {
      clearTimeout(this.tapHoldTimeout);
    }

    this.tapHoldTimeout = setTimeout(() => {
      if (!this.isSelecting && !this.isPinching) {
        this.startSelection(touch);
      }
    }, this.options.tapHoldDuration);
  }

  onTerminalTouchMove(event) {
    if (event.touches.length === 2) {
      event.preventDefault();
      this.handlePinchZoom(event);
      return;
    }

    if (event.touches.length !== 1) return;
    if (this.isPinching) return;

    const touch = event.touches[0];
    const deltaX = Math.abs(touch.clientX - this.touchStartPos.x);
    const deltaY = Math.abs(touch.clientY - this.touchStartPos.y);
    const horizontalDelta = touch.clientX - this.touchStartPos.x;

    if (
      this.isEdgeGesture(this.initialTouchPos) &&
      Math.abs(horizontalDelta) > deltaY &&
      deltaX > this.options.moveThreshold
    ) {
      if (this.tapHoldTimeout) {
        clearTimeout(this.tapHoldTimeout);
        this.tapHoldTimeout = null;
      }
      return;
    }

    if (
      deltaX > this.options.moveThreshold ||
      deltaY > this.options.moveThreshold
    ) {
      if (this.tapHoldTimeout) {
        clearTimeout(this.tapHoldTimeout);
        this.tapHoldTimeout = null;
      }

      if (this.isSelecting && !this.isHandleDragging) {
        event.preventDefault();
        this.extendSelection(touch);
      }
    }
  }

  onTerminalTouchEnd() {
    if (this.isPinching) {
      this.endPinchZoom();
      return;
    }

    if (this.tapHoldTimeout) {
      clearTimeout(this.tapHoldTimeout);
      this.tapHoldTimeout = null;
    }

    if (this.isSelecting && !this.isHandleDragging) {
      this.finalizeSelection();
    } else if (!this.isSelecting) {
      if (this.isTerminalFocused()) {
        this.terminal.focus();
      }
    }
  }

  onHandleTouchStart(event) {
    event.preventDefault();
    event.stopPropagation();

    if (event.touches.length !== 1) return;

    let handleType = event.target.dataset.handleType;
    if (!handleType) {
      if (
        event.target === this.startHandle ||
        this.startHandle.contains(event.target)
      ) {
        handleType = "start";
      } else if (
        event.target === this.endHandle ||
        this.endHandle.contains(event.target)
      ) {
        handleType = "end";
      }
    }

    if (!handleType) return;

    this.isHandleDragging = true;
    this.dragHandle = handleType;

    const touch = event.touches[0];
    this.initialTouchPos = { x: touch.clientX, y: touch.clientY };

    const targetHandle =
      handleType === "start" ? this.startHandle : this.endHandle;
    targetHandle.style.cursor = "grabbing";
    targetHandle.style.setProperty("--handle-scale", "1.2");
  }

  onHandleTouchMove(event) {
    if (!this.isHandleDragging || event.touches.length !== 1) return;

    event.preventDefault();
    event.stopPropagation();

    const touch = event.touches[0];

    const deltaX = Math.abs(touch.clientX - this.initialTouchPos.x);
    const deltaY = Math.abs(touch.clientY - this.initialTouchPos.y);

    if (
      deltaX < this.options.moveThreshold &&
      deltaY < this.options.moveThreshold
    ) {
      return;
    }

    const adjustedTouch = {
      clientX: touch.clientX,
      clientY: touch.clientY - this.options.fingerOffset,
    };

    const coords = this.touchToTerminalCoords(adjustedTouch);
    if (!coords) return;

    if (this.dragHandle === "start") {
      this.selectionStart = coords;
      if (
        this.selectionEnd &&
        (coords.row > this.selectionEnd.row ||
          (coords.row === this.selectionEnd.row &&
            coords.col > this.selectionEnd.col))
      ) {
        const temp = this.selectionStart;
        this.selectionStart = this.selectionEnd;
        this.selectionEnd = temp;
        this.dragHandle = "end";
      }
    } else {
      this.selectionEnd = coords;
      if (
        this.selectionStart &&
        (coords.row < this.selectionStart.row ||
          (coords.row === this.selectionStart.row &&
            coords.col < this.selectionStart.col))
      ) {
        const temp = this.selectionEnd;
        this.selectionEnd = this.selectionStart;
        this.selectionStart = temp;
        this.dragHandle = "start";
      }
    }

    this.updateSelection();
  }

  onHandleTouchEnd(event) {
    if (!this.isHandleDragging) return;

    event.preventDefault();
    event.stopPropagation();

    this.isHandleDragging = false;
    this.dragHandle = null;

    [this.startHandle, this.endHandle].forEach((handle) => {
      handle.style.cursor = "grab";
      handle.style.removeProperty("--handle-scale");
    });

    this.finalizeSelection();
  }

  onSelectionChange() {
    if (!this.isSelecting) return;

    const selection = this.terminal.getSelection?.();
    if (selection && selection.length > 0) {
      this.currentSelection = selection;
      this.updateHandlePositions();
    }
  }

  onTerminalAreaTouchStart(event) {
    if (!this.isSelecting) return;

    if (this.selectionProtected) return;

    if (this.contextMenu && this.contextMenu.style.display === "flex") {
      const rect = this.contextMenu.getBoundingClientRect();
      const touch = event.touches[0];
      if (
        touch.clientX >= rect.left &&
        touch.clientX <= rect.right &&
        touch.clientY >= rect.top &&
        touch.clientY <= rect.bottom
      ) {
        return;
      }
    }

    const isHandleTouch =
      this.startHandle.contains(event.target) ||
      this.endHandle.contains(event.target);

    if (!isHandleTouch && this.terminal.element.contains(event.target)) {
      this.clearSelection();
    }
  }

  onDocumentTouchStart(event) {
    if (!this.isSelecting) return;
    if (!event.target) return;
    if (this.terminalContainer.contains(event.target)) return;
    this.forceClearSelection();
  }

  onOrientationChange() {
    setTimeout(() => {
      this.updateCellDimensions();
      if (this.isSelecting) {
        this.updateHandlePositions();
      }
    }, 100);
  }

  onTerminalScroll() {
    if (!this.isSelecting) return;

    this.updateHandlePositions();
    if (this.contextMenu && this.contextMenu.style.display === "flex") {
      this.hideContextMenu();
    }
  }

  onTerminalResize(size) {
    setTimeout(() => {
      this.updateCellDimensions();
      if (!this.isSelecting) return;

      if (this.selectionProtected) {
        this.updateHandlePositions();
        return;
      }

      if (
        this.selectionStart &&
        this.selectionEnd &&
        (this.selectionStart.row >= size.rows ||
          this.selectionEnd.row >= size.rows)
      ) {
        this.clearSelection();
        return;
      }

      this.updateHandlePositions();
      if (this.contextMenu && this.contextMenu.style.display === "flex") {
        this.hideContextMenu();
        setTimeout(() => {
          if (this.isSelecting && this.options.showContextMenu) {
            this.showContextMenu();
          }
        }, 100);
      }
    }, 50);
  }

  startSelection(touch) {
    const coords = this.touchToTerminalCoords(touch);
    if (!coords) return;

    this.wasFocusedBeforeSelection = this.isTerminalFocused();

    this.selectionProtected = true;
    if (this.protectionTimeout) {
      clearTimeout(this.protectionTimeout);
    }
    this.protectionTimeout = setTimeout(() => {
      this.selectionProtected = false;
    }, 1000);

    this.isSelecting = true;

    const wordBounds = this.getWordBoundsAt(coords);
    if (wordBounds) {
      this.selectionStart = wordBounds.start;
      this.selectionEnd = wordBounds.end;
    } else {
      this.selectionStart = coords;
      this.selectionEnd = coords;
    }

    this.terminal.clearSelection?.();
    this.updateSelection();
    this.currentSelection = this.terminal.getSelection?.();
    this.showHandles();

    if (this.options.showContextMenu) {
      this.showContextMenu();
    }

    if (this.options.hapticFeedback && navigator?.vibrate) {
      navigator.vibrate(50);
    }
  }

  extendSelection(touch) {
    const coords = this.touchToTerminalCoords(touch);
    if (!coords) return;

    this.selectionEnd = coords;
    this.updateSelection();
  }

  updateSelection() {
    if (!this.selectionStart || !this.selectionEnd) return;

    const start = this.selectionStart;
    const end = this.selectionEnd;

    let startRow = start.row;
    let startCol = start.col;
    let endRow = end.row;
    let endCol = end.col;

    if (startRow > endRow || (startRow === endRow && startCol > endCol)) {
      [startRow, startCol, endRow, endCol] = [endRow, endCol, startRow, startCol];
    }

    const length = this.calculateSelectionLength(
      startRow,
      startCol,
      endRow,
      endCol,
    );

    this.terminal.clearSelection?.();
    this.terminal.select?.(startCol, startRow, length);

    this.updateHandlePositions();

    if (this.contextMenuShouldStayVisible && this.options.showContextMenu) {
      this.showContextMenu();
    }
  }

  calculateSelectionLength(startRow, startCol, endRow, endCol) {
    if (startRow === endRow) {
      return endCol - startCol + 1;
    }

    const cols = this.terminal.cols;
    let length = cols - startCol;
    length += (endRow - startRow - 1) * cols;
    length += endCol + 1;
    return length;
  }

  finalizeSelection() {
    if (this.options.showContextMenu && this.currentSelection) {
      this.showContextMenu();
    }
  }

  showHandles() {
    this.startHandle.style.display = "block";
    this.endHandle.style.display = "block";
    this.updateHandlePositions();
  }

  hideHandles() {
    this.startHandle.style.display = "none";
    this.endHandle.style.display = "none";
  }

  updateHandlePositions() {
    if (!this.selectionStart || !this.selectionEnd) return;

    let logicalStart = this.selectionStart;
    let logicalEnd = this.selectionEnd;

    if (
      this.selectionStart.row > this.selectionEnd.row ||
      (this.selectionStart.row === this.selectionEnd.row &&
        this.selectionStart.col > this.selectionEnd.col)
    ) {
      logicalStart = this.selectionEnd;
      logicalEnd = this.selectionStart;
    }

    const startPos = this.terminalCoordsToPixels(logicalStart);
    const endPos = this.terminalCoordsToPixels(logicalEnd);

    if (startPos) {
      this.startHandle.style.display = "block";
      this.startHandle.style.left = `${startPos.x}px`;
      this.startHandle.style.top = `${startPos.y + this.cellDimensions.height + 4}px`;
    } else {
      this.startHandle.style.display = "none";
    }

    if (endPos) {
      this.endHandle.style.display = "block";
      this.endHandle.style.left = `${endPos.x + this.cellDimensions.width}px`;
      this.endHandle.style.top = `${endPos.y + this.cellDimensions.height + 4}px`;
    } else {
      this.endHandle.style.display = "none";
    }
  }

  showContextMenu() {
    if (!this.options.showContextMenu) return;

    if (!this.contextMenu) {
      this.createContextMenu();
    }

    this.contextMenuShouldStayVisible = true;

    const startPos = this.terminalCoordsToPixels(this.selectionStart);
    const endPos = this.terminalCoordsToPixels(this.selectionEnd);

    if (!startPos && !endPos) return;

    let centerX;
    let baseY;

    if (startPos && endPos) {
      centerX = (startPos.x + endPos.x) / 2;
      baseY = Math.max(startPos.y, endPos.y);
    } else if (startPos) {
      centerX = startPos.x;
      baseY = startPos.y;
    } else {
      centerX = endPos.x;
      baseY = endPos.y;
    }

    const menuWidth = this.contextMenu.offsetWidth || 200;
    const menuHeight = this.contextMenu.offsetHeight || 50;
    const containerRect = this.terminalContainer.getBoundingClientRect();

    let menuX = centerX - menuWidth / 2;
    let menuY = baseY + this.cellDimensions.height + 40;

    const minX = 10;
    const maxX = containerRect.width - menuWidth - 10;
    menuX = Math.max(minX, Math.min(menuX, maxX));

    const maxY = containerRect.height - menuHeight - 10;
    if (menuY > maxY) {
      const topY =
        startPos && endPos ? Math.min(startPos.y, endPos.y) : baseY;
      menuY = topY - menuHeight - 10;
    }
    menuY = Math.max(10, Math.min(menuY, maxY));

    this.contextMenu.style.left = `${menuX}px`;
    this.contextMenu.style.top = `${menuY}px`;
    this.contextMenu.style.display = "flex";
  }

  createContextMenu() {
    this.contextMenu = document.createElement("div");
    this.contextMenu.className = "terminal-context-menu";

    const menuItems = [
      {
        label: this.getString("copy", "Copy"),
        action: this.copySelection.bind(this),
      },
      {
        label: this.getString("paste", "Paste"),
        action: this.pasteFromClipboard.bind(this),
      },
      {
        label: this.getString("more", "More..."),
        action: this.showMoreOptions.bind(this),
      },
    ];

    menuItems.forEach((item) => {
      const button = document.createElement("button");
      button.textContent = item.label;
      let actionExecuted = false;

      const runAction = (event) => {
        event.preventDefault();
        event.stopPropagation();
        if (!actionExecuted) {
          actionExecuted = true;
          item.action();
        }
      };

      button.addEventListener("touchstart", (event) => {
        event.preventDefault();
        event.stopPropagation();
        actionExecuted = false;
      });

      button.addEventListener("touchend", runAction);
      button.addEventListener("mousedown", (event) => {
        event.preventDefault();
        event.stopPropagation();
        actionExecuted = false;
      });
      button.addEventListener("mouseup", runAction);
      button.addEventListener("click", (event) => {
        event.preventDefault();
        event.stopPropagation();
      });

      this.contextMenu.appendChild(button);
    });

    this.selectionOverlay.appendChild(this.contextMenu);
  }

  hideContextMenu() {
    if (this.contextMenu && !this.contextMenuShouldStayVisible) {
      this.contextMenu.style.display = "none";
    }
  }

  forceHideContextMenu() {
    if (this.contextMenu) {
      this.contextMenu.style.display = "none";
      this.contextMenuShouldStayVisible = false;
    }
  }

  copySelection() {
    const selectionText = this.currentSelection || this.terminal.getSelection?.();
    if (selectionText && cordova?.plugins?.clipboard) {
      cordova.plugins.clipboard.copy(selectionText);
    }
    this.forceClearSelection();
  }

  pasteFromClipboard() {
    if (cordova?.plugins?.clipboard) {
      cordova.plugins.clipboard.paste((text) => {
        if (text) {
          this.terminal.paste?.(text);
        }
        this.forceClearSelection();
      });
    }
  }

  showMoreOptions() {
    window.toast?.("More options are not implemented yet.");
    this.forceClearSelection();
  }

  clearSelection() {
    if (this.selectionProtected) return;

    const shouldRestoreFocus =
      this.wasFocusedBeforeSelection && this.isSelecting;

    this.isSelecting = false;
    this.isHandleDragging = false;
    this.selectionStart = null;
    this.selectionEnd = null;
    this.currentSelection = null;
    this.dragHandle = null;

    this.terminal.clearSelection?.();
    this.hideHandles();
    this.forceHideContextMenu();

    if (this.tapHoldTimeout) {
      clearTimeout(this.tapHoldTimeout);
      this.tapHoldTimeout = null;
    }

    if (this.protectionTimeout) {
      clearTimeout(this.protectionTimeout);
      this.protectionTimeout = null;
    }
    this.selectionProtected = false;

    if (shouldRestoreFocus && !this.isTerminalFocused()) {
      setTimeout(() => {
        if (!this.isSelecting) {
          this.terminal.focus?.();
        }
      }, 150);
    }

    this.wasFocusedBeforeSelection = false;
  }

  forceClearSelection() {
    const wasProtected = this.selectionProtected;
    this.selectionProtected = false;
    this.clearSelection();
    this.selectionProtected = wasProtected && this.isSelecting;
  }

  touchToTerminalCoords(touch) {
    const rect = this.terminal.element.getBoundingClientRect();
    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    if (x < 0 || y < 0 || x > rect.width || y > rect.height) {
      return null;
    }

    if (!this.cellDimensions.width || !this.cellDimensions.height) {
      this.updateCellDimensions();
    }

    if (!this.cellDimensions.width || !this.cellDimensions.height) {
      return null;
    }

    const col = Math.floor(x / this.cellDimensions.width);
    const row =
      Math.floor(y / this.cellDimensions.height) +
      this.terminal.buffer.active.viewportY;

    return {
      col: Math.max(0, Math.min(col, this.terminal.cols - 1)),
      row: Math.max(0, row),
    };
  }

  terminalCoordsToPixels(coords) {
    if (!coords) return null;

    if (!this.cellDimensions.width || !this.cellDimensions.height) {
      this.updateCellDimensions();
    }

    const rect = this.terminal.element.getBoundingClientRect();
    const containerRect = this.terminalContainer.getBoundingClientRect();

    const x =
      coords.col * this.cellDimensions.width +
      (rect.left - containerRect.left);
    const y =
      (coords.row - this.terminal.buffer.active.viewportY) *
        this.cellDimensions.height +
      (rect.top - containerRect.top);

    const isVisible =
      coords.row >= this.terminal.buffer.active.viewportY &&
      coords.row <
        this.terminal.buffer.active.viewportY + this.terminal.rows;

    return isVisible ? { x, y } : null;
  }

  updateCellDimensions() {
    const dimensions = this.terminal?._core?._renderService?.dimensions;
    if (dimensions?.css?.cell) {
      this.cellDimensions = {
        width: dimensions.css.cell.width,
        height: dimensions.css.cell.height,
      };
      return;
    }

    const rect = this.terminal.element.getBoundingClientRect();
    const cols = this.terminal.cols || 1;
    const rows = this.terminal.rows || 1;
    this.cellDimensions = {
      width: rect.width / cols,
      height: rect.height / rows,
    };
  }

  isTerminalFocused() {
    try {
      return (
        document.activeElement === this.terminal.element ||
        this.terminal.element.contains(document.activeElement) ||
        this.terminal._core?._hasFocus
      );
    } catch (error) {
      return false;
    }
  }

  getWordBoundsAt(coords) {
    try {
      const buffer = this.terminal.buffer.active;
      const line = buffer.getLine(coords.row);
      if (!line) return null;

      const lineText = line.translateToString(false);
      if (!lineText || coords.col >= lineText.length) return null;

      const char = lineText[coords.col];
      if (!this.isWordCharacter(char)) return null;

      let startCol = coords.col;
      while (startCol > 0 && this.isWordCharacter(lineText[startCol - 1])) {
        startCol--;
      }

      let endCol = coords.col;
      while (
        endCol < lineText.length - 1 &&
        this.isWordCharacter(lineText[endCol + 1])
      ) {
        endCol++;
      }

      if (endCol >= startCol) {
        return {
          start: { row: coords.row, col: startCol },
          end: { row: coords.row, col: endCol },
        };
      }

      return null;
    } catch (error) {
      console.warn("Error finding word bounds:", error);
      return null;
    }
  }

  isWordCharacter(char) {
    if (!char) return false;
    return /[a-zA-Z0-9_\-.]/.test(char);
  }

  startPinchZoom(event) {
    if (event.touches.length !== 2) return;

    this.isPinching = true;
    this.initialFontSize = this.terminal.options.fontSize;

    const touch1 = event.touches[0];
    const touch2 = event.touches[1];

    this.pinchStartDistance = this.getDistance(touch1, touch2);
    this.lastPinchDistance = this.pinchStartDistance;

    if (this.tapHoldTimeout) {
      clearTimeout(this.tapHoldTimeout);
      this.tapHoldTimeout = null;
    }
  }

  handlePinchZoom(event) {
    if (!this.isPinching || event.touches.length !== 2) return;

    const now = Date.now();
    if (now - this.lastZoomTime < this.options.zoomThrottle) return;
    this.lastZoomTime = now;

    const touch1 = event.touches[0];
    const touch2 = event.touches[1];
    const currentDistance = this.getDistance(touch1, touch2);

    const scale = currentDistance / this.pinchStartDistance;
    const newFontSize = Math.round(this.initialFontSize * scale);

    const minFontSize = this.options.minFontSize;
    const maxFontSize = this.options.maxFontSize;
    const clampedFontSize = Math.max(
      minFontSize,
      Math.min(maxFontSize, newFontSize),
    );

    if (
      clampedFontSize !== this.terminal.options.fontSize &&
      typeof this.options.onFontSizeChange === "function"
    ) {
      this.options.onFontSizeChange(clampedFontSize);
    }
  }

  endPinchZoom() {
    this.isPinching = false;
    this.pinchStartDistance = 0;
    this.lastPinchDistance = 0;
    this.initialFontSize = 0;
  }

  getDistance(touch1, touch2) {
    const dx = touch2.clientX - touch1.clientX;
    const dy = touch2.clientY - touch1.clientY;
    return Math.hypot(dx, dy);
  }

  isEdgeGesture(touch) {
    const edgeThreshold = 30;
    const screenWidth = window.innerWidth;
    if (touch.clientX <= edgeThreshold) {
      return true;
    }
    if (touch.clientX >= screenWidth - edgeThreshold) {
      return true;
    }
    return false;
  }

  getString(key, fallback) {
    try {
      if (typeof window !== "undefined" && window?.strings?.[key]) {
        return window.strings[key];
      }
    } catch (error) {
      // ignore lookup failures
    }
    return fallback;
  }

  updateHandles() {
    this.updateHandlePositions();
  }

  destroy() {
    this.forceClearSelection();

    this.terminal.element.removeEventListener(
      "touchstart",
      this.boundHandlers.terminalTouchStart,
    );
    this.terminal.element.removeEventListener(
      "touchmove",
      this.boundHandlers.terminalTouchMove,
    );
    this.terminal.element.removeEventListener(
      "touchend",
      this.boundHandlers.terminalTouchEnd,
    );
    this.terminal.element.removeEventListener(
      "touchstart",
      this.boundHandlers.terminalAreaTouchStart,
    );
    this.terminal.element.removeEventListener(
      "scroll",
      this.boundHandlers.terminalScroll,
    );

    this.startHandle.removeEventListener(
      "touchstart",
      this.boundHandlers.handleTouchStart,
    );
    this.startHandle.removeEventListener(
      "touchmove",
      this.boundHandlers.handleTouchMove,
    );
    this.startHandle.removeEventListener(
      "touchend",
      this.boundHandlers.handleTouchEnd,
    );

    this.endHandle.removeEventListener(
      "touchstart",
      this.boundHandlers.handleTouchStart,
    );
    this.endHandle.removeEventListener(
      "touchmove",
      this.boundHandlers.handleTouchMove,
    );
    this.endHandle.removeEventListener(
      "touchend",
      this.boundHandlers.handleTouchEnd,
    );

    window.removeEventListener(
      "orientationchange",
      this.boundHandlers.orientationChange,
    );
    window.removeEventListener("resize", this.boundHandlers.orientationChange);

    document.removeEventListener(
      "touchstart",
      this.boundHandlers.documentTouchStart,
    );

    if (this.selectionChangeDisposable?.dispose) {
      this.selectionChangeDisposable.dispose();
    } else if (this.terminal.onSelectionChange) {
      try {
        this.terminal.onSelectionChange(null);
      } catch (error) {
        console.warn("Could not remove selection change listener", error);
      }
    }

    if (this.resizeDisposable?.dispose) {
      this.resizeDisposable.dispose();
    }

    if (this.selectionOverlay?.parentNode) {
      this.selectionOverlay.parentNode.removeChild(this.selectionOverlay);
    }
  }
}
