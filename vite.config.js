import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
//import eslint from 'vite-plugin-eslint';
import fs from "fs";

const HMR_PORT=process.env.PROJECT_REMIX_CHAIN ? 8443 : null; //A: en glitch usamos 8443
console.log('HMR_PORT',HMR_PORT);

// https://vitejs.dev/config/
export default defineConfig({
	esbuild: { loader: "jsx", include: /src\/.*\.jsx?$/, exclude: [] }, 
	optimizeDeps: { esbuildOptions: { plugins: [ { name: "load-js-files-as-jsx", setup(build) { build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => { return ({ loader: "jsx", contents: await fs.promises.readFile(args.path, "utf8"), }) }); }, }, ], }, },
	plugins: [
		reactRefresh(),
	],
	build: {
		outDir: "build"
	},
	server: {
		strictPort: true,
			hmr: {
				port: 8443,
			}
	}
});
