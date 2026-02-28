/** @jsx h */
/** @jsxFrag Fragment */
import { Fragment, h } from "preact";
import { useEffect, useRef } from "preact/hooks";
import Icons from "../utils/icons";

function Icon({ markup }) {
  return (
    <span class="icon-markup" dangerouslySetInnerHTML={{ __html: markup }} />
  );
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

function HeaderDivider() {
  return <span class="header-divider" aria-hidden="true" />;
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
        {!searchVisible && (
          <div class="default-actions">
            <ActionButton
              className="new-session"
              label="New session"
              markup={Icons.plus}
              onClick={onCreateSession}
            />
            {enableGuiViewer && (
              <ActionButton
                className="gui-viewer"
                label="Open GUI viewer"
                markup={Icons.imagePlay}
                onClick={onOpenGuiViewer}
              />
            )}
            <HeaderDivider />
            <ActionButton
              className="search-btn"
              label="Search"
              markup={Icons.search}
              onClick={onToggleSearch}
            />
            <ActionButton
              className="folder-icon"
              label="Navigate to active folder"
              markup={Icons.folder}
              onClick={onNavigateToDir}
            />
            <HeaderDivider />
            <ActionButton
              className="minimize"
              label="Minimize terminal"
              markup={Icons.minimise}
              onClick={onMinimize}
            />
            <ActionButton
              className="close"
              label="Close terminal"
              markup={Icons.close}
              onClick={onClose}
            />
          </div>
        )}

        {searchVisible && (
          <div class="search-bar">
            <div class="search-field">
              <span class="search-icon">
                <Icon markup={Icons.search} />
              </span>
              <input
                ref={localSearchInputRef}
                type="text"
                value={searchQuery}
                placeholder="Find in terminal..."
                aria-label="Search input"
                onInput={(event) => onSearchChange(event.currentTarget.value)}
                onKeyDown={(event) => {
                  if (event.key === "Escape") {
                    event.preventDefault();
                    onToggleSearch();
                  }
                }}
              />
            </div>
            <div class="search-nav">
              <ActionButton
                className="find-previous"
                label="Find previous"
                markup={Icons.findPrevious}
                onClick={onSearchPrevious}
                disabled={!searchQuery}
              />
              <ActionButton
                className="find-next"
                label="Find next"
                markup={Icons.findNext}
                onClick={onSearchNext}
                disabled={!searchQuery}
              />
              <ActionButton
                className="close-search"
                label="Close search"
                markup={Icons.close}
                onClick={onToggleSearch}
              />
            </div>
          </div>
        )}
      </div>
    </Fragment>
  );
}

export function FloatingTerminalButton() {
  return <Icon markup={Icons.terminal} />;
}
