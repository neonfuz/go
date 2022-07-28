# GO game

Hosted live [HERE](https://gowithfriends.netlify.app/play).

This is a WIP version of the ancient board game called go (AKA igo, weiqi, baduk). You can read about the game [here](https://en.wikipedia.org/wiki/Go_(game)).

It is implemented with svelte dynamically rendering the board to SVG.

Currently the game rules are implemented, and it is playable with 2 players on a single machine. Future features include network play, and playing against the computer.

![Screenshot 2022-07-28 at 14-59-37 Screenshot](https://user-images.githubusercontent.com/2590830/181627443-7a36f1cb-c693-422d-a13b-db97348c5853.png)

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
