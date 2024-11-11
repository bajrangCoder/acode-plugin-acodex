const appSettings = acode.require("settings");

// ai models logo
acode.addIcon("deepseek", "https://raw.githubusercontent.com/deepseek-ai/DeepSeek-Coder/main/pictures/home.png");
acode.addIcon("chatgpt", "https://upload.wikimedia.org/wikipedia/commons/0/04/ChatGPT_logo.svg");
acode.addIcon("gemini", "https://upload.wikimedia.org/wikipedia/commons/4/45/Gemini_language_model_logo.png");

export const GUI_VIEWER = false;
export const IMAGE_RENDERING = false;
export const ALLOW_TRANSPRANCY = false;
export const SELECTION_HAPTICS = true;
export const FONT_LIGATURES = true;
export const CURSOR_BLINK = true;
export const CURSOR_STYLE = ["block", "underline", "bar"];
export const CURSOR_INACTIVE_STYLE = [
  "outline",
  "block",
  "bar",
  "underline",
  "none",
];
export const FONT_SIZE = 11;
export const FONT_FAMILY = "MesloLGS NF Regular";
export const FONT_WEIGHT = [
  "normal",
  "bold",
  "100",
  "200",
  "300",
  "400",
  "500",
  "600",
  "700",
  "800",
  "900",
];
export const SCROLLBACK = 1000;
export const SCROLL_SENSITIVITY = 1000;
export const showTerminalBtnSize = 35;
export const showTerminalBtn = true; // to hide/unhide show terminal button
export const DEFAULT_THEME = "catppuccin";
export const THEME_LIST = [
    "ayuDark",
    "ayuLight",
    "ayuMirage",
    "catppuccin",
    "dracula",
    "elementary",
    "everblush",
    "light",
    "material",
    "nekonakoDjancoeg",
    "oneDark",
    "sapphire",
    "siduckOneDark",
    "snazzy",
    "xterm",
    "custom",
  ];
export const FONTS_LIST = [
  [
    appSettings.get("editorFont"),
    "Default Editor Font",
    "file file_type_font",
    true,
  ],
  [
    "Fira Code Bold Nerd Font",
    "Fira Code Bold Nerd Font",
    "file file_type_font",
    true,
  ],
  [
    "Fira Code Medium Nerd Font",
    "Fira Code Medium Nerd Font",
    "file file_type_font",
    true,
  ],
  [
    "JetBrains Mono Bold Nerd Font",
    "JetBrains Mono Bold Nerd Font",
    "file file_type_font",
    true,
  ],
  [
    "JetBrains Mono Medium Nerd Font",
    "JetBrains Mono Medium Nerd Font",
    "file file_type_font",
    true,
  ],
  [
    "VictorMonoNerdFont Bold",
    "VictorMonoNerdFont Bold",
    "file file_type_font",
    true,
  ],
  [
    "VictorMonoNerdFont BoldItalic",
    "VictorMonoNerdFont BoldItalic",
    "file file_type_font",
    true,
  ],
  [
    "VictorMonoNerdFont Medium",
    "VictorMonoNerdFont Medium",
    "file file_type_font",
    true,
  ],
  [
    "VictorMonoNerdFont Italic",
    "VictorMonoNerdFont Italic",
    "file file_type_font",
    true,
  ],
  [
    "SauceCodeProNerdFont Bold",
    "SauceCodeProNerdFont Bold",
    "file file_type_font",
    true,
  ],
  [
    "SauceCodeProNerdFont Medium",
    "SauceCodeProNerdFont Medium",
    "file file_type_font",
    true,
  ],
  [
    "MesloLGS NF Bold Italic",
    "MesloLGS NF Bold Italic",
    "file file_type_font",
    true,
  ],
  ["MesloLGS NF Bold", "MesloLGS NF Bold", "file file_type_font", true],
  ["MesloLGS NF Italic", "MesloLGS NF Italic", "file file_type_font", true],
  ["MesloLGS NF Regular", "MesloLGS NF Regular", "file file_type_font", true],
];

export const AI_MODEL = "deepseek";
export const AVAILABLE_AI_MODELS = [
  [
    "deepseek",
    "Deepseek",
    "deepseek",
    true
  ],
  [
    "chatgpt",
    "ChatGPT",
    "chatgpt",
    true
  ],
  [
    "gemini-pro",
    "Gemini Pro",
    "gemini",
    true
  ],
  [
    "local-llm",
    "Local LLM(ollama)",
    "icon phone_android",
    true
  ]
];