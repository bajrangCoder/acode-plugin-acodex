
export function isTouchDevice() {
  return 'ontouchstart' in window || navigator.maxTouchPoints > 0;
}

export function transparentColor(element) {
  let currentBackgroundColor =
    window.getComputedStyle(element).backgroundColor;
  var rgbValues = currentBackgroundColor.match(/\d+/g);
  var currentAlpha = parseFloat(rgbValues[3]) || 1.0;
  return `rgba(${rgbValues[0]}, ${rgbValues[1]}, ${rgbValues[2]}, 0.5)`;
}

export function filterTermInputData(data) {
  /**
   * Function to filter out non-printable characters and control sequences
   **/
  let filteredData = "";
  for (let i = 0; i < data.length; i++) {
    const charCode = data.charCodeAt(i);
    if (
      (charCode >= 32 && charCode <= 126) ||
      charCode === 13 || // Carriage return (Enter)
      charCode === 8 // Backspace
    ) {
      filteredData += data[i];
    }
  }
  return filteredData;
}

export function convertPath(path) {
  if (path.startsWith("content://com.termux.documents/tree")) {
    let termuxPath = path
      .split("::")[1]
      .substring(0, path.split("::")[1].lastIndexOf("/"))
      .replace(/^\/data\/data\/com\.termux\/files\/home/, "$HOME");
    return termuxPath;
  } else if (path.startsWith("file:///storage/emulated/0/")) {
    let sdcardPath =
      "/sdcard" +
      path
        .substr("file:///storage/emulated/0".length)
        .replace(/\.[^/.]+$/, "")
        .split("/")
        .slice(0, -1)
        .join("/") +
      "/";
    return sdcardPath;
  } else if (
    path.startsWith(
      "content://com.android.externalstorage.documents/tree/primary"
    )
  ) {
    let androidPath =
      "/sdcard/" +
      path
        .split("::primary:")[1]
        .substring(0, path.split("::primary:")[1].lastIndexOf("/"));
    return androidPath;
  } else {
    return false;
  }
}

export function hexToTransparentRGBA(hex, alpha) {
  // Remove the hash character if it's present
  hex = hex.replace("#", "");

  // Parse the hex value to RGB
  const r = parseInt(hex.substring(0, 2), 16);
  const g = parseInt(hex.substring(2, 4), 16);
  const b = parseInt(hex.substring(4, 6), 16);

  // Return the RGBA string with the specified alpha value
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}

export async function downloadFont(fsOperation, loader) {
  try {
    const baseFontDir = window.DATA_STORAGE + "acodex_fonts";
    const baseFontUrl =
      "https://cdn.jsdelivr.net/gh/bajrangCoder/acode-plugin-acodex@main/fonts/";
    const fontsUrls = [
      baseFontUrl + "Fira Code Bold Nerd Font.ttf",
      baseFontUrl + "Fira Code Medium Nerd Font Complete Mono.ttf",
      baseFontUrl + "JetBrains Mono Bold Nerd Font Complete.ttf",
      baseFontUrl + "JetBrains Mono Medium Nerd Font Complete.ttf",
      baseFontUrl + "MesloLGS NF Bold Italic.ttf",
      baseFontUrl + "MesloLGS NF Bold.ttf",
      baseFontUrl + "MesloLGS NF Italic.ttf",
      baseFontUrl + "MesloLGS NF Regular.ttf",
      baseFontUrl + "SauceCodeProNerdFont-Bold.ttf",
      baseFontUrl + "SauceCodeProNerdFont-Medium.ttf",
      baseFontUrl + "VictorMonoNerdFont-Bold.ttf",
      baseFontUrl + "VictorMonoNerdFont-BoldItalic.ttf",
      baseFontUrl + "VictorMonoNerdFont-Italic.ttf",
      baseFontUrl + "VictorMonoNerdFont-Medium.ttf"
    ];
    if (!(await fsOperation(baseFontDir).exists())) {
      await fsOperation(window.DATA_STORAGE).createDirectory("acodex_fonts");
      const fontDownloadLoader = loader.create(
        "AcodeX",
        "Downloading Fonts..."
      );
      for (const fontFileURL of fontsUrls) {
        const fileName = fontFileURL.split("/").pop();
        fontDownloadLoader.setMessage(`Downloading Font: ${fileName}`);
        fetch(fontFileURL)
          .then(response => response.blob())
          .then(async blob => {
            await fsOperation(baseFontDir).createFile(fileName, blob);
          })
          .catch(error => {
            fontDownloadLoader.destroy();
            window.toast(
              `Error fetching font file: ${error.toString()}`,
              4000
            );
          });
      }
      fontDownloadLoader.destroy();
      window.toast("Fonts Downloaded successfully 💥", 3000);
    }
  } catch (err) {
    console.log(err);
    loader.destroy();
  }
}


export function fontsStyleSheetStr(baseFontUrl) {
  return `
@font-face {
  font-family: "Fira Code Bold Nerd Font";
  src: url("${baseFontUrl}Fira Code Bold Nerd Font.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "Fira Code Medium Nerd Font";
  src: url("${baseFontUrl}Fira Code Medium Nerd Font Complete Mono.ttf")
    format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "JetBrains Mono Bold Nerd Font";
  src: url("${baseFontUrl}JetBrains Mono Bold Nerd Font Complete.ttf")
    format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "JetBrains Mono Medium Nerd Font";
  src: url("${baseFontUrl}JetBrains Mono Medium Nerd Font Complete.ttf")
    format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "VictorMonoNerdFont Bold";
  src: url("${baseFontUrl}VictorMonoNerdFont-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "VictorMonoNerdFont BoldItalic";
  src: url("${baseFontUrl}VictorMonoNerdFont-BoldItalic.ttf") format("truetype");
  font-weight: bold;
  font-style: italic;
}
@font-face {
  font-family: "VictorMonoNerdFont Medium";
  src: url("${baseFontUrl}VictorMonoNerdFont-Medium.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "VictorMonoNerdFont Italic";
  src: url("${baseFontUrl}VictorMonoNerdFont-Italic.ttf") format("truetype");
  font-weight: normal;
  font-style: italic;
}
@font-face {
  font-family: "SauceCodeProNerdFont Bold";
  src: url("${baseFontUrl}SauceCodeProNerdFont-Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "SauceCodeProNerdFont Medium";
  src: url("${baseFontUrl}SauceCodeProNerdFont-Medium.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
@font-face {
  font-family: "MesloLGS NF Bold Italic";
  src: url("${baseFontUrl}MesloLGS NF Bold Italic.ttf") format("truetype");
  font-weight: bold;
  font-style: italic;
}
@font-face {
  font-family: "MesloLGS NF Bold";
  src: url("${baseFontUrl}MesloLGS NF Bold.ttf") format("truetype");
  font-weight: bold;
  font-style: normal;
}
@font-face {
  font-family: "MesloLGS NF Italic";
  src: url("${baseFontUrl}MesloLGS NF Italic.ttf") format("truetype");
  font-weight: normal;
  font-style: italic;
}
@font-face {
  font-family: "MesloLGS NF Regular";
  src: url("${baseFontUrl}MesloLGS NF Regular.ttf") format("truetype");
  font-weight: normal;
  font-style: normal;
}
  `;
}