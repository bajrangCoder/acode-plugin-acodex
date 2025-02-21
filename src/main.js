import AcodeX from "./AcodeX.js";
import plugin from "../plugin.json";

if (window.acode) {
  const acodePlugin = new AcodeX();
  acode.setPluginInit(
    plugin.id,
    async (initUrl, $page, { cacheFileUrl, cacheFile }) => {
      const baseUrl = initUrl.endsWith("/") ? initUrl : `${initUrl}/`;
      acodePlugin.baseUrl = baseUrl;
      await acodePlugin.init($page, cacheFile, cacheFileUrl);
    },
    acodePlugin.settingsObj,
  );
  acode.setPluginUnmount(plugin.id, () => {
    acodePlugin.destroy();
  });
}
