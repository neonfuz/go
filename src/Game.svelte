<script>
 import Board from './Board.svelte';
 import Piece from './Piece.svelte';

 export let n = 9, border = 10;
 let turn = 'white';
 let hoverPos = null;
 let pieces = [];

 $: pieces = new Array(n).fill().map(() => new Array(n).fill(null));

 function piecePlace(e) {
     const pos = e.detail;
     if (!pieces[pos.y][pos.x]) {
         pieces[pos.y][pos.x] = turn;
         turn = (turn === 'white') ? 'black' : 'white';
     }
 }
 function pieceHover(e) { hoverPos = e.detail; }
 function pieceUnhover(e) { hoverPos = null; }
</script>

<svg viewbox="0 0 {100+border*2} {100+border*2}" {...$$props}
     xmlns="http://www.w3.org/2000/svg" version="1.1">
    <Board
        {n} x={border} y={border} width=100 height=100
        on:piece-place="{piecePlace}"
        on:piece-hover="{pieceHover}"
        on:piece-unhover="{pieceUnhover}"
    >
        {#each pieces as row, y}
            {#each row as turn, x}
                {#if turn}
                    <Piece pos={{x, y}} {turn} />
                {/if}
            {/each}
        {/each}
        {#if hoverPos}
            <Piece opacity=0.5 pos={hoverPos} {turn} />
        {/if}
    </Board>

</svg>

<style>
 svg {
     background: #dcb35c;
 }
</style>
