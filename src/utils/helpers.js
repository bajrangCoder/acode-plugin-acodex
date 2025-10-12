export function isTouchDevice() {
  return "ontouchstart" in window || navigator.maxTouchPoints > 0;
}

export function transparentColor(element) {
  const currentBackgroundColor =
    window.getComputedStyle(element).backgroundColor;
  const rgbValues = currentBackgroundColor.match(/\d+/g);
  const currentAlpha = Number.parseFloat(rgbValues[3]) || 1.0;
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
    const termuxPath = path
      .split("::")[1]
      .substring(0, path.split("::")[1].lastIndexOf("/"))
      .replace(/^\/data\/data\/com\.termux\/files\/home/, "$HOME");
    return termuxPath;
  }
  if (path.startsWith("file:///storage/emulated/0/")) {
    const sdcardPath = `/sdcard${path
      .substr("file:///storage/emulated/0".length)
      .replace(/\.[^/.]+$/, "")
      .split("/")
      .slice(0, -1)
      .join("/")}/`;
    return sdcardPath;
  }
  if (
    path.startsWith(
      "content://com.android.externalstorage.documents/tree/primary",
    )
  ) {
    const androidPath = `/sdcard/${path
      .split("::primary:")[1]
      .substring(0, path.split("::primary:")[1].lastIndexOf("/"))}`;
    return androidPath;
  }
  return false;
}

export function hexToTransparentRGBA(hex, alpha) {
  // Remove the hash character if it's present
  const hexValue = hex.replace("#", "");

  // Parse the hex value to RGB
  const r = Number.parseInt(hexValue.substring(0, 2), 16);
  const g = Number.parseInt(hexValue.substring(2, 4), 16);
  const b = Number.parseInt(hexValue.substring(4, 6), 16);

  // Return the RGBA string with the specified alpha value
  return `rgba(${r}, ${g}, ${b}, ${alpha})`;
}
