<script>
 import Board from './Board.svelte';
 import ClickRect from './ClickRect.svelte';

 export let n = 19;
 let turn = 'white';
 let hoverPos = {x: 2, y: 2};

 function piecePlace(e) {
     alert(e.detail);
 }
 function pieceHover(e) {
     hoverPos = e.detail;
 }

 $: gap = 100/(n-1);
</script>

<svg viewbox="0 0 100 100" {...$$props}
     xmlns="http://www.w3.org/2000/svg" version="1.1">
    <Board {n} />
    {#if hoverPos}
        <circle
            cx="{hoverPos.x*gap}" cy="{hoverPos.y*gap}"
            r="{50/n}" fill="{turn}" stroke="none" opacity="0.5" />
    {/if}
    <ClickRect {n}
        x="{0}" y="{0}" width="{100}" height="{100}"
        on:piece-place="{piecePlace}" on:piece-hover={pieceHover} />
</svg>

<style>
 svg {
     background: #dcb35c;
 }
</style>
