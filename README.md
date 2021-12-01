**💛 You can help the author become a full-time open-source maintainer by [sponsoring him on GitHub](https://github.com/sponsors/egoist).**

---

# vite-plugin-remove-exports

[![npm version](https://badgen.net/npm/v/vite-plugin-remove-exports)](https://npm.im/vite-plugin-remove-exports) [![npm downloads](https://badgen.net/npm/dm/vite-plugin-remove-exports)](https://npm.im/vite-plugin-remove-exports)

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
        return ['remove_this_export']
      },
    }),
  ],
}
```

Now if you have a `foo.ts`:

```ts
export let keep_this_export = 1
export let remove_this_export = 2
```

`remove_this_export` will be removed from the bundled code!

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
