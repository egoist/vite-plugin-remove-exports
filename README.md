**💛 You can help the author become a full-time open-source maintainer by [sponsoring him on GitHub](https://github.com/sponsors/egoist).**

---

# vite-plugin-remove-exports

[![npm version](https://badgen.net/npm/v/vite-plugin-remove-exports)](https://npm.im/vite-plugin-remove-exports) [![npm downloads](https://badgen.net/npm/dm/vite-plugin-remove-exports)](https://npm.im/vite-plugin-remove-exports)

## Use Case

It's useful if you want to implement something like Next.js' `getServerSideProps` or the `loader` function from Remix.js. This is done by creating a proxy of your code with the exports you specfied excluded and using esbuild to bundle the proxy code in order to eliminate unneeded exports.

Despite that we added an extra step to the build process, the plugin is still very fast due the how fast esbuild is.

## Install

```bash
npm i vite-plugin-remove-exports
```

## Usage

`vite.config.ts`:

```ts
export default {
  plugins: [
    removeExports({
      match() {
        return ['getServerSideProps']
      },
    }),
  ],
}
```

Now if you have a `index.ts`:

```tsx
import fs from 'fs'

export const getServerSideProps = () => {
  return {
    content: fs.readFileSync('./foo.txt', 'utf-8'),
  }
}

export default ({ content }) => {
  return <div>{content}</div>
}
```

The output will be:

```ts
export default ({ content }) => {
  return <div>{content}</div>
}
```

Advanced usage:

```ts
removeExports({
  match(filepath, ssr) {
    // Ignore SSR build
    if (!ssr) return

    // Remove getServerSideProps in "pages" in browser build
    if (filepath.startsWith(pagesDir)) {
      return ['getServerSideProps']
    }
  },
}),
```

## Caveats

- `export *` is not supported.

## Sponsors

[![sponsors](https://sponsors-images.egoist.sh/sponsors.svg)](https://github.com/sponsors/egoist)

## License

MIT &copy; [EGOIST](https://github.com/sponsors/egoist)
