# GO game

This is a WIP version of the ancient board game called go (AKA igo, weiqi, baduk). You can read about it [here](https://en.wikipedia.org/wiki/Go_(game)).


Currently you can play the game with 2 players on one machine. In the future I plan on adding networking, and playing against an AI.

## Developing

The project is based on [svelte-kit](https://github.com/sveltejs/kit/). It uses [pnpm](https://pnpm.io/) for package management.

To install dependencies run

``` bash
pnpm i
```

Then to start a development server

``` bash
pnpm run dev
```

## Building

To create a production version of the app:

```bash
npm run build
```

You can preview the production build with `npm run preview`.
