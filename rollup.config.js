import path from 'path';

import svelte from 'rollup-plugin-svelte';
import commonjs from '@rollup/plugin-commonjs';
import resolve from '@rollup/plugin-node-resolve';
import { terser } from 'rollup-plugin-terser';
import sveltePreprocess from 'svelte-preprocess';
import typescript from '@rollup/plugin-typescript';
import css from 'rollup-plugin-css-only';
import alias from '@rollup/plugin-alias';

const production = !process.env.ROLLUP_WATCH;

export default {
	input: 'src/main.ts',
	output: {
		sourcemap: true,
		format: 'iife',
		name: 'doity',
		file: 'public/build/bundle.js'
	},
	plugins: [
		svelte({
			preprocess: sveltePreprocess({
				sourceMap: !production,
				postcss: {
					plugins: [
						require('tailwindcss'),
						require('autoprefixer')
					]
				}
			}),
			compilerOptions: {
				dev: !production
			}
		}),
		alias({
			entries: [{
					find: 'models',
					replacement: path.resolve(__dirname, 'src/models')
				}, {
					find: 'store',
					replacement: path.resolve(__dirname, 'src/store')
				}, {
					find: 'services',
					replacement: path.resolve(__dirname, 'src/services')
				}, {
					find: 'ui-elements',
					replacement: path.resolve(__dirname, 'src/components/ui-elements')
				}
			]
		}),
		css({
			output: 'bundle.css'
		}),
		resolve({
			browser: true,
			dedupe: [
				'svelte'
			]
		}),
		commonjs(),
		typescript({
			sourceMap: !production,
			inlineSources: !production
		}),
		production && terser()
	],
	watch: {
		clearScreen: true
	}
};
