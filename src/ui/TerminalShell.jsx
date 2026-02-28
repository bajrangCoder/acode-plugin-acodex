/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import Icons from "../utils/icons";

function Icon({ markup }) {
  return <span class="icon-markup" dangerouslySetInnerHTML={{ __html: markup }} />;
}

function ActionButton({
  className = "",
  label,
  markup,
  onClick,
  hidden = false,
  disabled = false,
}) {
  return (
    <button
      type="button"
      class={`action-button ${className}`.trim()}
      aria-label={label}
      onClick={onClick}
      hidden={hidden}
      disabled={disabled}
    >
      <Icon markup={markup} />
    </button>
  );
}

export function TerminalShell({
  bindSearchInput,
  searchVisible,
  searchQuery,
  sessionName,
  enableGuiViewer,
  onSessionSelect,
  onCreateSession,
  onToggleSearch,
  onNavigateToDir,
  onMinimize,
  onClose,
  onOpenGuiViewer,
  onSearchChange,
  onSearchNext,
  onSearchPrevious,
}) {
  const localSearchInputRef = useRef(null);

  useEffect(() => {
    bindSearchInput?.(localSearchInputRef.current);
  }, [bindSearchInput]);

  useEffect(() => {
    if (!searchVisible) return;
    localSearchInputRef.current?.focus();
    localSearchInputRef.current?.select();
  }, [searchVisible]);

  return (
    <Fragment>
      <div class="left-section">
        <div
          class="session-info"
          role="button"
          tabIndex={0}
          onClick={onSessionSelect}
          onKeyDown={(event) => {
            if (event.key === "Enter" || event.key === " ") {
              event.preventDefault();
              onSessionSelect();
            }
          }}
        >
          <span class="pointer-indicator" aria-hidden="true" />
          <h3 class="session-name">{sessionName}</h3>
        </div>
      </div>

      <div class="btn-section">
        <ActionButton
          className="new-session"
          label="New session"
          markup={Icons.plus}
          onClick={onCreateSession}
          hidden={searchVisible}
        />
        <ActionButton
          className="gui-viewer"
          label="Open GUI viewer"
          markup={Icons.imagePlay}
          onClick={onOpenGuiViewer}
          hidden={!enableGuiViewer || searchVisible}
        />
        <ActionButton
          className="search-btn"
          label={searchVisible ? "Close search" : "Search"}
          markup={Icons.search}
          onClick={onToggleSearch}
        />
        <ActionButton
          className="folder-icon"
          label="Navigate to active folder"
          markup={Icons.folder}
          onClick={onNavigateToDir}
          hidden={searchVisible}
        />
        <ActionButton
          className="minimize"
          label="Minimize terminal"
          markup={Icons.minimise}
          onClick={onMinimize}
          hidden={searchVisible}
        />
        <ActionButton
          className="close"
          label="Close terminal"
          markup={Icons.close}
          onClick={onClose}
          hidden={searchVisible}
        />

        <div class={`search-input-container ${searchVisible ? "show" : ""}`}>
          <ActionButton
            className="find-previous"
            label="Find previous"
            markup={Icons.findPrevious}
            onClick={onSearchPrevious}
            disabled={!searchQuery}
          />
          <input
            ref={localSearchInputRef}
            type="text"
            value={searchQuery}
            placeholder="Find..."
            aria-label="Search input"
            onInput={(event) => onSearchChange(event.currentTarget.value)}
          />
          <ActionButton
            className="find-next"
            label="Find next"
            markup={Icons.findNext}
            onClick={onSearchNext}
            disabled={!searchQuery}
          />
        </div>
      </div>
    </Fragment>
  );
}

export function FloatingTerminalButton() {
  return <Icon markup={Icons.terminal} />;
}
