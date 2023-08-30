import { resolve } from 'node:path';
import { defineConfig } from 'vite';
import vue from '@vitejs/plugin-vue';
import dts from 'vite-plugin-dts';
import { epOutput, epRoot, generateExternal } from '@element-plus-encapsulation/build-utils';

export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      input: ['./index.ts'],
      external: generateExternal({ full: false }),
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
    })
  ]
});