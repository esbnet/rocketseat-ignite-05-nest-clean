import swc from 'unplugin-swc'
import { defineConfig } from 'vitest/config'

import tsConfigPath from 'vite-tsconfig-paths'

export default defineConfig({
  test: {
    globals: true,
    root: './',
  },
  plugins: [
    tsConfigPath(),
    swc.vite({
      module: { type: 'es6' },
    }),
  ],
})
