import { fileURLToPath, URL } from "node:url";

import { defineConfig } from "vite";
import vue from "@vitejs/plugin-vue";
import vueDevTools from "vite-plugin-vue-devtools";
import Icons from "unplugin-icons/vite";
import IconsResolver from "unplugin-icons/resolver";
import Components from "unplugin-vue-components/vite";
import { PrimeVueResolver } from "unplugin-vue-components/resolvers";
import AutoImport from "unplugin-auto-import/vite";

// https://vite.dev/config/
export default defineConfig({
    plugins: [
        vue(),
        vueDevTools({ launchEditor: "webstorm" }),
        Components({
            resolvers: [ IconsResolver(),
                PrimeVueResolver()
            ]
        }),
        Icons({ compiler: "vue3", autoInstall: true }),
        AutoImport({
            resolvers: [ IconsResolver({ prefix: "Icon" }) ],
            dts: true
        })
    ],
    server: {
        host: true,
        port: 5030
    },
    resolve: {
        alias: {
            "@": fileURLToPath(new URL("./src", import.meta.url))
        }
    }
});
