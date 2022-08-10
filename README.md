# GO game

Hosted live [HERE](https://gowithfriends.netlify.app/play).

This is an online web version of the ancient board game called go (AKA igo, weiqi, baduk). You can read about the game [here](https://en.wikipedia.org/wiki/Go_(game)).

It is implemented with svelte dynamically rendering the board to SVG.

Currently the game is fully playable with 2 players on a single machine. Network
play and CPU matches are planned.

![Screenshot](/docs/go-seigen-vs-miyamoto-naoki.png)

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

To build the app for production

```bash
npm run build
# to preview the production build:
npm run preview
```
