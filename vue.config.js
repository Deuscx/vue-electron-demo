const { defineConfig } = require("@vue/cli-service");
// eslint-disable-next-line @typescript-eslint/no-var-requires
const UnoCSS = require("unocss/webpack").default;
module.exports = defineConfig({
  transpileDependencies: true,
  configureWebpack: {
    plugins: [
      UnoCSS({
        /* options */
      }),
    ],
  },
  pluginOptions: {
    electronBuilder: {
      preload: 'src/preload.ts',
      builderOptions: {
        // options placed here will be merged with default configuration and passed to electron-builder
        win: {
          artifactName: "Hello Setup ${version}-${arch}.exe",
          target: [
            {
              target: "nsis",
              arch: ["x64"],
            },
          ],
        },
        nsis: {
          shortcutName: "Hello",
          // oneClick: false,
          // allowToChangeInstallationDirectory: true,
        },
      },
    },
  },
});
