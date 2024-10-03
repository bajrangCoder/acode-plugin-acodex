export default class SelectionCore {
  isSelecting = false;
  isTapAndHoldActive = false;
  tapHoldTimeout = null;
  selectionStart = null;
  selectionEnd = null;
  lastTapTime = 0; // Store the timestamp of the last tap
  tapThreshold = 300; // Maximum time (in ms) allowed between taps to count as a double-tap
  touchStartY = 0;
  touchStartTime = 0;
  scrollThreshold = 10; // pixels
  scrollTimeThreshold = 100; // milliseconds 

  constructor(terminal, startHandle, endHandle, terminalContainer, terminalHeader) {
    this.terminal = terminal;
    this.startHandle = startHandle;
    this.endHandle = endHandle;
    this.terminalContainer = terminalContainer;
    this.terminalHeader = terminalHeader;
  }

  _getCellSize() {
    const renderer = this.terminal._core._renderService.dimensions;
    return {
      cellWidth: renderer.css.cell.width,
      cellHeight: renderer.css.cell.height
    };
  }

  getTouchCoordinates(event) {
    const rect = this.terminal.element.getBoundingClientRect();
    const touch = event.touches[0];

    const x = touch.clientX - rect.left;
    const y = touch.clientY - rect.top;

    const { cellWidth, cellHeight } = this._getCellSize();

    const scrollOffset = this.terminal.buffer.active.viewportY;
    const column = Math.floor(x / cellWidth);
    const row = Math.floor(y / cellHeight) + scrollOffset;

    return { row, column };
  }

  /*setHandlePosition1(handle, row, column, isStartHandle = false) {
    const { cellWidth, cellHeight } = this._getCellSize();
    const rect = this.terminal.element.getBoundingClientRect();

    const scrollOffset = this.terminal.buffer.active.viewportY;
    const adjustedRow = row - scrollOffset;

    let x = isStartHandle
      ? rect.left + column * cellWidth - 10
      : rect.left + (column + 1) * cellWidth - cellWidth;

    let y = rect.top + adjustedRow * cellHeight + cellHeight;

    // swapping logic
    const isSwapped = this.selectionStart.row > this.selectionEnd.row ||
      (this.selectionStart.row === this.selectionEnd.row && this.selectionStart.column > this.selectionEnd.column);

    if (isSwapped) {
      x = !isStartHandle
        ? rect.left + column * cellWidth - 10
        : rect.left + (column + 1) * cellWidth - cellWidth;
    }

    // handles should stay within the terminal viewport
    x = Math.max(rect.left, Math.min(x, rect.right - handle.offsetWidth));
    y = Math.max(rect.top, Math.min(y, rect.bottom - handle.offsetHeight));

    handle.style.left = `${x}px`;
    handle.style.top = `${y}px`;
    handle.style.display = 'block';
  }*/
  
  setHandlePosition(handle, row, column, isStartHandle = false) {
    const { cellWidth, cellHeight } = this._getCellSize();
    const rect = this.terminal.element.getBoundingClientRect();

    const terminalContainer = this.terminalContainer;
    const terminalHeader = this.terminalHeader;
    
    // Heights
    const terminalContainerRect = terminalContainer.getBoundingClientRect();
    const terminalHeaderHeight = terminalHeader ? terminalHeader.getBoundingClientRect().height : 0;
    
    // Terminal scroll position and viewport Y-offset
    const terminalScrollOffset = this.terminal.element.scrollTop || 0;
    const viewportScrollOffset = this.terminal.buffer.active.viewportY;

    // Adjust the row to reflect scrolling inside the terminal
    const adjustedRow = row - viewportScrollOffset;

    // X position based on column
    let x = isStartHandle
        ? rect.left + column * cellWidth - 10
        : rect.left + (column + 1) * cellWidth - cellWidth;

    let y = rect.top + (adjustedRow * cellHeight) - terminalHeaderHeight - terminalScrollOffset - cellHeight;

    const isSwapped = this.selectionStart.row > this.selectionEnd.row ||
      (this.selectionStart.row === this.selectionEnd.row && this.selectionStart.column > this.selectionEnd.column);

    if (isSwapped) {
      x = !isStartHandle
        ? rect.left + column * cellWidth - 10
        : rect.left + (column + 1) * cellWidth - cellWidth;
    }

    // Ensure the handle stays within bounds of terminal
    x = Math.max(rect.left, Math.min(x, rect.right - handle.offsetWidth));
    y = Math.max(terminalContainerRect.top, Math.min(y, terminalContainerRect.bottom - handle.offsetHeight));

    // Set the position of the handle
    handle.style.left = `${x}px`;
    handle.style.top = `${y}px`;
    handle.style.display = 'block';
  }

  hideHandles() {
    this.startHandle.style.display = 'none';
    this.endHandle.style.display = 'none';
  }

  showHandles() {
    this.startHandle.style.display = 'block';
    this.endHandle.style.display = 'block';
  }

  startSelection(row, column) {
    this.selectionStart = { row, column };
    this.selectionEnd = { row, column };
    this.isSelecting = true;

    this.terminal.clearSelection();
    this.terminal.select(column, row, 1);
    this.setHandlePosition(this.startHandle, row, column, true);
    this.setHandlePosition(this.endHandle, row, column);
  }

  updateSelection() {
    this.terminal.clearSelection();

    let startRow = this.selectionStart.row;
    let startColumn = this.selectionStart.column;
    let endRow = this.selectionEnd.row;
    let endColumn = this.selectionEnd.column;

    // start is always before end in the terminal's text flow
    if (startRow > endRow || (startRow === endRow && startColumn > endColumn)) {
      [startRow, startColumn, endRow, endColumn] = [endRow, endColumn, startRow, startColumn];
    }

    const totalLength = this._calculateTotalSelectionLength(startRow, endRow, startColumn, endColumn);
    this.terminal.select(startColumn, startRow, totalLength);

    // Set handle positions based on their actual positions, not the selection bounds
    this.setHandlePosition(this.startHandle, this.selectionStart.row, this.selectionStart.column, true);
    this.setHandlePosition(this.endHandle, this.selectionEnd.row, this.selectionEnd.column);
  }

  _calculateTotalSelectionLength(startRow, endRow, startColumn, endColumn) {
    const terminalCols = this.terminal.cols;

    if (startRow === endRow) {
      return Math.abs(endColumn - startColumn) + 1;
    } else {
      let length = 0;
      length += terminalCols - startColumn;
      length += (endRow - startRow - 1) * terminalCols;
      length += endColumn + 1;
      return length;
    }
  }

  startHandleTouchMoveCb(event) {
    event.preventDefault();
    const coords = this.getTouchCoordinates(event);
    if (!coords) return;

    this.selectionStart = coords;
    this.updateSelection();
  }

  endHandleTouchMoveCb(event) {
    event.preventDefault();
    const coords = this.getTouchCoordinates(event);
    if (!coords) return;

    this.selectionEnd = coords;
    this.updateSelection();
  }

  terminalTouchStartCb(event) {
    this.touchStartY = event.touches[0].clientY;
    this.touchStartTime = Date.now();

    const coords = this.getTouchCoordinates(event);
    if (!coords) return;

    this.isTapAndHoldActive = false;

    this.tapHoldTimeout = setTimeout(() => {
      this.isTapAndHoldActive = true;
      this.terminal.focus()
      this.startSelection(coords.row, coords.column);
    }, 500);
  }

  terminalTouchMoveCb(event) {
    if (this.isSelecting) {
      event.preventDefault();
      const coords = this.getTouchCoordinates(event);
      if (!coords) return;

      this.selectionEnd = coords;
      this.updateSelection();
    } else {
      // Check if it's a scroll
      const touchMoveY = event.touches[0].clientY;
      const touchMoveDelta = Math.abs(this.touchMoveY - this.touchStartY);
      const touchMoveTime = Date.now() - this.touchStartTime;

      if (touchMoveDelta > this.scrollThreshold && touchMoveTime < this.scrollTimeThreshold) {
        clearTimeout(this.tapHoldTimeout);
      }
    }
  }

  terminalTouchEndCb(event) {
    clearTimeout(this.tapHoldTimeout);
    if (!this.isSelecting) this.terminal.focus();
  }

  terminalSelectionChangeCb() {
    const selection = this.terminal.getSelection();
    if (selection && selection.length > 0) {
      //showHandles()
    } else {
      this.hideHandles();
      this.isSelecting = false;
    }
  }

  removeSelectionCb(event) {
    if (!this.$terminal?.element.contains(event.target)) {
      this.isSelecting = false;
      this.$terminal?.clearSelection();
      this.hideHandles();
    }
  }
}