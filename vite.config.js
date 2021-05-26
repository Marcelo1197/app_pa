import { defineConfig } from "vite";
import reactRefresh from "@vitejs/plugin-react-refresh";
//import eslint from 'vite-plugin-eslint';
import fs from "fs";

// https://vitejs.dev/config/
export default defineConfig({
	esbuild: { loader: "jsx", include: /src\/.*\.jsx?$/, exclude: [] }, 
	optimizeDeps: { esbuildOptions: { plugins: [ { name: "load-js-files-as-jsx", setup(build) { build.onLoad({ filter: /src\/.*\.js$/ }, async (args) => { return ({ loader: "jsx", contents: await fs.promises.readFile(args.path, "utf8"), }) }); }, }, ], }, },
	plugins: [
		reactRefresh(),
/*		eslint({
			cache: false,
			fix: false,
			include: ['./*.js', './*.jsx'],
		}),
*/
	],
	build: {
		outDir: "build"
	},
	server: {
		strictPort: true,
			hmr: {
				//port: 8443 // Run the websocket server on the SSL port
			}
	}
});
