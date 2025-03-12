import { defineConfig, type RsbuildPluginAPI } from "@lynx-js/rspeedy";

import { pluginQRCode } from "@lynx-js/qrcode-rsbuild-plugin";
import { pluginReactLynx } from "@lynx-js/react-rsbuild-plugin";

import { copyFile } from "fs/promises";
import path from "path";

export default defineConfig({
  plugins: [
    pluginQRCode({
      schema(url) {
        // We use `?fullscreen=true` to open the page in LynxExplorer in full screen mode
        return `${url}?fullscreen=true`;
      },
    }),
    pluginReactLynx(),
    {
      name: "move-bundle",
      setup(api: RsbuildPluginAPI) {
        api.onAfterBuild(() => {
          copyFile(
            path.join(api.context.distPath, "main.lynx.bundle"),
            path.join(api.context.rootPath, "ios/lynxdex/main.lynx.bundle")
          );
        });
      },
    },
  ],
});
