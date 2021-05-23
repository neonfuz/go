<script>
 import Board from './Board.svelte';
 import Piece from './Piece.svelte';

 export let n = 9, border = 10, toggleTurns = true;
 let turn = 'white';
 let moves = [];
 let board = [];

 $: board = new Array(n).fill().map(() => new Array(n).fill(null));
 $: opponent = turn === 'white' ? 'black' : 'white';

 const getPiece = (x, y) => board[y] && board[y][x];
 // iterate over piece group
 function* overGroup(item) {
     const start = item;
     do {
         yield item;
         item = moves[item.next];
     } while (item !== start);
 }
 // iterate over piece neighbors
 function* overNeighbors(piece) {
     const {pos: {x, y}} = piece;
     yield getPiece(x-1, y);
     yield getPiece(x+1, y);
     yield getPiece(x, y-1);
     yield getPiece(x, y+1);
 }

 function mergeGroup(a, b) {
     // make sure b is not already in a's group
     for (const item of overGroup(a))
         if (item === b)
             return;
     // merge a and b
     if (a.turn === b.turn) {
         const swap = a.next;
         a.next = b.next;
         b.next = swap;
     }
 }
 function removeIfDead(target) {
     // return if group is alive
     for (const move of overGroup(target))
         for (const neighbor of overNeighbors(move))
             if (neighbor === null)
                 return;
     // group is dead, remove it
     for (const {pos: {x, y}} of overGroup(target))
         board[y][x] = null;
 }
 function piecePlace(e) {
     const {x, y} = e.detail;
     // check that spot is open
     if (getPiece(x, y) === null) {
         // construct piece
         let piece = {turn, pos: {x, y}};
         // place piece and set group pointer to self
         board[y][x] = piece.next = moves.push(piece) - 1;
         for (let neighbor of overNeighbors(piece)) {
             if (typeof neighbor !== 'number') continue;
             neighbor = moves[neighbor];
             switch (neighbor.turn) {
                 case turn: mergeGroup(piece, neighbor); break;
                 case opponent: removeIfDead(neighbor); break;
                 default: alert('unreachable!'); break;
             }
         }
         if (toggleTurns)
             turn = opponent;
     }
 }
 let hoverPos = null;
 function pieceHover(e) { hoverPos = e.detail; }
 function pieceUnhover() { hoverPos = null; }
</script>

<svg viewbox="0 0 {100+border*2} {100+border*2}" {...$$props}
     xmlns="http://www.w3.org/2000/svg" version="1.1">
    <Board
        {n} x={border} y={border} width=100 height=100
        on:piece-place="{piecePlace}"
        on:piece-hover="{pieceHover}"
        on:piece-unhover="{pieceUnhover}"
    >
        {#each board as row}
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
