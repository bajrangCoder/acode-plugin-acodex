import plugin from "../plugin.json";
import AcodeX from "./AcodeX.js";

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
