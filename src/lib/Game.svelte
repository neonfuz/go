<script>
 import Board from './Board.svelte';
 import Piece from './Piece.svelte';

 export let n = 9, border = 10, toggleTurns = true;
 let turn = 'white';
 let moves = [];
 let board = [];

 $: board = new Array(n).fill().map(() => new Array(n).fill(null));
 $: opponent = turn === 'white' ? 'black' : 'white';

 // Main functionality
 function piecePlace(e) {
     const {x, y} = e.detail;
     // check that spot is open
     if (getSpot(x, y) === null) {
         // construct move
         let move = {turn, pos: {x, y}};
         // place piece and set group pointer to self
         board[y][x] = move.next = moves.push(move) - 1;
         for (const spot of overNeighbors(move)) {
             if (typeof spot !== 'number') continue;
             const neighbor = moves[spot];
             switch (neighbor.turn) {
                 case turn: mergeGroup(move, neighbor); break;
                 case opponent: removeIfDead(neighbor); break;
                 default: alert('unreachable!'); break;
             }
         }
         if (toggleTurns)
             turn = opponent;
     }
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

 // Getters & Iterators
 function getSpot(x, y) {
     return board[y] && board[y][x];
 }
 // iterate over piece group
 function* overGroup(item) {
     const start = item;
     do {
         yield item;
         item = moves[item.next];
     } while (item !== start);
 }
 // iterate over spot neighbors
 function* overNeighbors(move) {
     const {pos: {x, y}} = move;
     yield getSpot(x-1, y);
     yield getSpot(x+1, y);
     yield getSpot(x, y-1);
     yield getSpot(x, y+1);
 }

 let hover = null;
</script>

<svg viewbox="0 0 {100+border*2} {100+border*2}" {...$$props}
     xmlns="http://www.w3.org/2000/svg" version="1.1">
    <Board
        {n} x={border} y={border} width=100 height=100
        on:piece-place="{piecePlace}"
        on:piece-hover="{e => hover = e.detail}"
        on:piece-unhover="{() => hover = null}"
    >
        {#each board as row}
            {#each row as piece}
                {#if moves[piece]}
                    <Piece pos={moves[piece].pos} turn={moves[piece].turn} />
                {/if}
            {/each}
        {/each}
        {#if hover}
            <Piece opacity=0.5 pos={hover} {turn} />
        {/if}
    </Board>
</svg>

<style>
 svg {
     background: #dcb35c;
     touch-action: none;
 }
</style>
