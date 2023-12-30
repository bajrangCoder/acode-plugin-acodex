import plugin from "../plugin.json";
import {
  FONT_WEIGHT,
  CURSOR_INACTIVE_STYLE,
  CURSOR_STYLE,
  FONTS_LIST,
  THEME_LIST,
} from "./constants";

const appSettings = acode.require("settings");

export const settingsList = [
  {
    key: "port",
    text: "Server Port",
    value: appSettings.value[plugin.id].port,
    info: "Port which is displayed on termux when starting the server",
    prompt: "Server Port",
    promptType: "number",
    promptOption: [
      {
        required: true,
      },
    ],
  },
  {
    key: "serverHost",
    text: "Server Host Name",
    value: appSettings.value[plugin.id].serverHost,
    info: "Hostname which is displayed on termux when starting the server",
    prompt: "Server Host Name",
    promptType: "text",
    promptOption: [
      {
        required: true,
      },
    ],
  },
  {
    key: "fontWeight",
    text: "Font Weight",
    value: appSettings.value[plugin.id].fontWeight,
    info: "The font weight used to render non-bold text.",
    select: FONT_WEIGHT,
  },
  {
    key: "showTerminalBtnSize",
    text: "Show Terminal button size",
    value: appSettings.value[plugin.id].showTerminalBtnSize,
    info: "Size of terminal show button (in px)",
    prompt: "Show Terminal button size",
    promptType: "number",
    promptOption: [
      {
        required: true,
      },
    ],
  },
  {
    key: "blurValue",
    text: "Blur Value(in px)",
    value: appSettings.value[plugin.id].blurValue,
    info: "Blur value for terminal in transparent mode",
    prompt: "Blur Value",
    promptType: "text",
    promptOption: [
      {
        required: true,
      },
    ],
  },
  {
    key: "clearCache",
    text: "Clear Cache",
    info: "Helps in clearing cache which contains session details in case of any problems or bug",
  },
  {
    key: "transparency",
    text: "Allow Transparent Terminal",
    info: "Makes terminal transparent but it will also led to slightly performance decrement",
    checkbox: !!appSettings.value[plugin.id].transparency,
  },
  {
    index: 7,
    key: "customFontStyleSheet",
    text: "Custom Font Stylesheet file",
    info: "Select css file in which you have to define about your custom font.",
    value: appSettings.value[plugin.id].customFontStyleSheet,
  },
  {
    index: 0,
    key: "cursorBlink",
    text: "Cursor Blink",
    info: "Whether the cursor blinks.",
    checkbox: !!appSettings.value[plugin.id].cursorBlink,
  },
  {
    index: 1,
    key: "cursorStyle",
    text: "Cursor Style",
    value: appSettings.value[plugin.id].cursorStyle,
    info: "The style of the cursor.",
    select: CURSOR_STYLE,
  },
  {
    key: "cursorInactiveStyle",
    text: "Cursor Inactive Style",
    value: appSettings.value[plugin.id].cursorInactiveStyle,
    info: "The style of the cursor when the terminal is not focused.",
    select: CURSOR_INACTIVE_STYLE,
  },
  {
    index: 2,
    key: "fontSize",
    text: "Font Size",
    value: appSettings.value[plugin.id].fontSize,
    info: "The font size used to render text.",
    prompt: "Font Size",
    promptType: "text",
    promptOption: [
      {
        match: /^[0-9]+$/,
        required: true,
      },
    ],
  },
  {
    index: 3,
    key: "fontFamily",
    text: "Font Family",
    value: appSettings.value[plugin.id].fontFamily,
    info: "The font family used to render text.",
    select: FONTS_LIST,
  },
  {
    index: 4,
    key: "scrollBack",
    text: "Scroll Back",
    value: appSettings.value[plugin.id].scrollBack,
    info: "The amount of scrollback in the terminal. Scrollback is the amount of rows that are retained when lines are scrolled beyond the initial viewport.",
    prompt: "Scroll Back",
    promptType: "number",
    promptOption: [
      {
        match: /^[0-9]+$/,
        required: true,
      },
    ],
  },
  {
    index: 5,
    key: "scrollSensitivity",
    text: "Scroll Sensitivity",
    value: appSettings.value[plugin.id].scrollSensitivity,
    info: "The scrolling speed multiplier used for adjusting normal scrolling speed.",
    prompt: "Scroll Sensitivity",
    promptType: "number",
    promptOption: [
      {
        match: /^[0-9]+$/,
        required: true,
      },
    ],
  },
  {
    index: 6,
    key: "theme",
    text: "Theme",
    value: appSettings.value[plugin.id].theme,
    info: "Theme of terminal.",
    select: THEME_LIST,
  },
];

export const settingsListWithThemeColor = [
  {
    index: 8,
    key: "background",
    text: "Background Color",
    value: appSettings.value[plugin.id].background,
    color: appSettings.value[plugin.id].background,
  },
  {
    index: 9,
    key: "foreground",
    text: "Foreground Color",
    value: appSettings.value[plugin.id].foreground,
    color: appSettings.value[plugin.id].foreground,
  },
  {
    index: 10,
    key: "selectionBackground",
    text: "Selection Background Color",
    value: appSettings.value[plugin.id].selectionBackground,
    color: appSettings.value[plugin.id].selectionBackground,
  },
  {
    index: 11,
    key: "cursor",
    text: "Cursor Color",
    value: appSettings.value[plugin.id].cursor,
    color: appSettings.value[plugin.id].cursor,
  },
  {
    index: 12,
    key: "cursorAccent",
    text: "Cursor Accent Color",
    value: appSettings.value[plugin.id].cursorAccent,
    color: appSettings.value[plugin.id].cursorAccent,
  },
  {
    index: 13,
    key: "black",
    text: "Black Color",
    value: appSettings.value[plugin.id].black,
    color: appSettings.value[plugin.id].black,
  },
  {
    index: 14,
    key: "blue",
    text: "Blue Color",
    value: appSettings.value[plugin.id].blue,
    color: appSettings.value[plugin.id].blue,
  },
  {
    index: 15,
    key: "brightBlack",
    text: "Bright Black Color",
    value: appSettings.value[plugin.id].brightBlack,
    color: appSettings.value[plugin.id].brightBlack,
  },
  {
    index: 16,
    key: "brightBlue",
    text: "Bright Blue Color",
    value: appSettings.value[plugin.id].brightBlue,
    color: appSettings.value[plugin.id].brightBlue,
  },
  {
    index: 17,
    key: "brightCyan",
    text: "Bright Cyan Color",
    value: appSettings.value[plugin.id].brightCyan,
    color: appSettings.value[plugin.id].brightCyan,
  },
  {
    index: 18,
    key: "brightGreen",
    text: "Bright Green Color",
    value: appSettings.value[plugin.id].brightGreen,
    color: appSettings.value[plugin.id].brightGreen,
  },
  {
    index: 19,
    key: "brightMagenta",
    text: "Bright Magenta Color",
    value: appSettings.value[plugin.id].brightMagenta,
    color: appSettings.value[plugin.id].brightMagenta,
  },
  {
    index: 20,
    key: "brightRed",
    text: "Bright Red Color",
    value: appSettings.value[plugin.id].brightRed,
    color: appSettings.value[plugin.id].brightRed,
  },
  {
    index: 21,
    key: "brightWhite",
    text: "Bright White Color",
    value: appSettings.value[plugin.id].brightWhite,
    color: appSettings.value[plugin.id].brightWhite,
  },
  {
    index: 22,
    key: "brightYellow",
    text: "Bright Yellow Color",
    value: appSettings.value[plugin.id].brightYellow,
    color: appSettings.value[plugin.id].brightYellow,
  },
  {
    index: 23,
    key: "cyan",
    text: "Cyan Color",
    value: appSettings.value[plugin.id].cyan,
    color: appSettings.value[plugin.id].cyan,
  },
  {
    index: 24,
    key: "green",
    text: "Green Color",
    value: appSettings.value[plugin.id].green,
    color: appSettings.value[plugin.id].green,
  },
  {
    index: 25,
    key: "magenta",
    text: "Magenta Color",
    value: appSettings.value[plugin.id].magenta,
    color: appSettings.value[plugin.id].magenta,
  },
  {
    index: 26,
    key: "red",
    text: "Red Color",
    value: appSettings.value[plugin.id].red,
    color: appSettings.value[plugin.id].red,
  },
  {
    index: 27,
    key: "white",
    text: "White Color",
    value: appSettings.value[plugin.id].white,
    color: appSettings.value[plugin.id].white,
  },
  {
    index: 28,
    key: "yellow",
    text: "Yellow Color",
    value: appSettings.value[plugin.id].yellow,
    color: appSettings.value[plugin.id].yellow,
  },
];
