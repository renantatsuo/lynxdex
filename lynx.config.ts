import { defineConfig, type RsbuildPluginAPI } from "@lynx-js/rspeedy";

import { pluginQRCode } from "@lynx-js/qrcode-rsbuild-plugin";
import { pluginReactLynx } from "@lynx-js/react-rsbuild-plugin";
import { pluginSass } from "@rsbuild/plugin-sass";

import { cp } from "fs/promises";
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
        api.onAfterBuild(async () => {
          try {
            const iosBundle = cp(
              path.join(api.context.distPath, "main.lynx.bundle"),
              path.join(api.context.rootPath, "ios/lynxdex/main.lynx.bundle")
            );
            const iosStatic = cp(
              path.join(api.context.distPath, "static"),
              path.join(api.context.rootPath, "ios/lynxdex/static"),
              { recursive: true }
            );
            const androidBundle = cp(
              path.join(api.context.distPath, "main.lynx.bundle"),
              path.join(
                api.context.rootPath,
                "android/app/src/main/assets/main.lynx.bundle"
              )
            );
            const androidStatic = cp(
              path.join(api.context.distPath, "static"),
              path.join(
                api.context.rootPath,
                "android/app/src/main/assets/static"
              ),
              { recursive: true }
            );

            await Promise.all([
              iosStatic,
              iosBundle,
              androidStatic,
              androidBundle,
            ]);
          } catch (error) {
            console.error("Error during file copy:", error);
          }
        });
      },
    },
  ],
  output: {
    dataUriLimit: 0,
  },
});
