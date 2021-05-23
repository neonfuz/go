<script>
 import Board from './Board.svelte';
 import Piece from './Piece.svelte';

 export let n = 9, border = 10, toggleTurns = true;;
 let turn = 'white';
 let hoverPos = null;
 let moves = [];
 let pieces = [];

 $: pieces = new Array(n).fill().map(() => new Array(n).fill(null));
 $: opponent = turn === 'white' ? 'black' : 'white';

 function* loopover(item) {
     const start = item;
     do {
         yield item;
         item = moves[item.next];
     } while (item !== start);
 }
 function groupMerge(a, x, y) {
     if (typeof(pieces[y] && pieces[y][x]) != 'number')
         return;
     const b = moves[pieces[y][x]];
     for (const item of loopover(a))
         if (item === b)
             return;
     if (a.turn === b.turn) {
         const swap = a.next;
         a.next = b.next;
         b.next = swap;
     }
 }
 function piecePlace(e) {
     const pos = e.detail;
     if (!pieces[pos.y][pos.x]) {
         let piece = {turn, pos};
         pieces[pos.y][pos.x] = piece.next = moves.push(piece) - 1;
         groupMerge(piece, pos.x-1, pos.y);
         groupMerge(piece, pos.x,   pos.y-1);
         groupMerge(piece, pos.x+1, pos.y);
         groupMerge(piece, pos.x,   pos.y+1);
         if (toggleTurns)
             turn = opponent;
         moves=moves;
     } else {
         const start = moves[pieces[pos.y][pos.x]];
         let ref = start;
         do {
             pieces[ref.pos.y][ref.pos.x] = null;
             ref = moves[ref.next];
         } while (ref != start);
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
        {#each pieces as row}
            {#each row as piece}
                {#if moves[piece]}
                    <Piece pos={moves[piece].pos} turn={moves[piece].turn} />
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
