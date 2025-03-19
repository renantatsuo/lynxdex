import { defineConfig, type RsbuildPluginAPI } from "@lynx-js/rspeedy";

import { pluginQRCode } from "@lynx-js/qrcode-rsbuild-plugin";
import { pluginReactLynx } from "@lynx-js/react-rsbuild-plugin";
import { pluginSass } from "@rsbuild/plugin-sass";

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
    pluginSass(),
    {
      name: "move-bundle",
      setup(api: RsbuildPluginAPI) {
        api.onAfterBuild(() => {
          copyFile(
            path.join(api.context.distPath, "main.lynx.bundle"),
            path.join(api.context.rootPath, "ios/lynxdex/main.lynx.bundle")
          );
          copyFile(
            path.join(api.context.distPath, "main.lynx.bundle"),
            path.join(
              api.context.rootPath,
              "android/app/src/main/assets/main.lynx.bundle"
            )
          );
        });
      },
    },
  ],
  output: {
    dataUriLimit: 50000,
  },
});
