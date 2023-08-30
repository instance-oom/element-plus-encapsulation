import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { epOutput, epRoot } from '@element-plus-encapsulation/build-utils';

export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      input: ['./index.ts'],
      external: ['element-plus', 'vue', /\.scss/],
      output: [
        {
          format: 'es',
          entryFileNames: '[name].mjs',
          preserveModules: true,
          preserveModulesRoot: epRoot,
          exports: 'named',
          dir: resolve(epOutput, `es`)
        },
        {
          format: 'cjs',
          entryFileNames: '[name].js',
          preserveModules: true,
          preserveModulesRoot: epRoot,
          exports: 'named',
          dir: resolve(epOutput, `lib`)
        }
      ]
    },
    lib: {
      entry: './index.ts',
      name: 'elementPlusEncapsulation'
    }
  },
  plugins: [
    vue(),
    dts({
      entryRoot: epRoot,
      outDir: [
        resolve(epOutput, 'es'),
        resolve(epOutput, 'lib')
      ],
      tsconfigPath: '../../tsconfig.json',
    }),
    {
      name: 'style',
      generateBundle(config, bundle) {
        const keys = Object.keys(bundle);
        for (const key of keys) {
          const bundler: any = bundle[key as any];
          
          this.emitFile({
            type: 'asset',
            fileName: key, //文件名名不变
            source: bundler.code.replace(/\.scss/g, '.css')
          });
        }
      }
    }
  ]
}) as any;