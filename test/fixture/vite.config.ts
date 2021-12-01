import { defineConfig } from 'vite'
import removeExports from '../../dist'

export default defineConfig({
  build: {
    minify: false,
    rollupOptions: {
      output: {
        entryFileNames: '[name].js',
      },
    },
  },
  plugins: [
    removeExports({
      match(id) {
        return ['this_export_is_removed']
      },
    }),
  ],
})
