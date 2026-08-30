const RIO_ANSI_COLORS = [
  "black",
  "red",
  "green",
  "yellow",
  "blue",
  "magenta",
  "cyan",
  "white",
  "brightBlack",
  "brightRed",
  "brightGreen",
  "brightYellow",
  "brightBlue",
  "brightMagenta",
  "brightCyan",
  "brightWhite",
];

const RIO_FALLBACK_THEME = {
  foreground: "#ffffff",
  background: "#000000",
  cursor: "#ffffff",
  selectionForeground: "#ffffff",
  selectionBackground: "#4d4d4d",
  black: "#000000",
  red: "#cd0000",
  green: "#00cd00",
  yellow: "#cdcd00",
  blue: "#0000ee",
  magenta: "#cd00cd",
  cyan: "#00cdcd",
  white: "#e5e5e5",
  brightBlack: "#7f7f7f",
  brightRed: "#ff0000",
  brightGreen: "#00ff00",
  brightYellow: "#ffff00",
  brightBlue: "#5c5cff",
  brightMagenta: "#ff00ff",
  brightCyan: "#00ffff",
  brightWhite: "#ffffff",
};

/**
 * Translate an xterm.js ITheme-compatible object into RioTerm's complete
 * Theme shape. Rio requires every ANSI slot and uses selectionForeground
 * where xterm themes commonly only define selectionBackground.
 */
export function xtermThemeToRioTheme(theme = {}) {
  const rioTheme = {
    foreground: theme.foreground || RIO_FALLBACK_THEME.foreground,
    background: theme.background || RIO_FALLBACK_THEME.background,
    cursor: theme.cursor || theme.foreground || RIO_FALLBACK_THEME.cursor,
    selectionForeground:
      theme.selectionForeground || theme.foreground || RIO_FALLBACK_THEME.selectionForeground,
    selectionBackground:
      theme.selectionBackground || theme.selection || RIO_FALLBACK_THEME.selectionBackground,
  };

  for (const color of RIO_ANSI_COLORS) {
    rioTheme[color] = theme[color] || RIO_FALLBACK_THEME[color];
  }

  return rioTheme;
}
