<script>
 import ClickRect from './ClickRect.svelte';
 export let n = 19;
 $: board = (n-1);
 function getStarPoints(n) {
     const depth = n >= 13 ? 3 : 2;
     let points = [
         // Corners
         [depth, depth],
         [depth, n-1-depth],
         [n-1-depth, depth],
         [n-1-depth, n-1-depth]
     ];
     if (n % 2) {
         const center = Math.floor(n/2);
         points.push([center, center]);
         if (n > 13) {
             points.push(
                 // edges
                 [center, depth],
                 [n-1-depth, center],
                 [center, n-1-depth],
                 [depth, center]
             );
         }
     }
     return points;
 }
 $: points = getStarPoints(n);
 const getPos = (e, r) => ({
     x: Math.floor((e.clientX - r.x) / r.width * n),
     y: Math.floor((e.clientY - r.y) / r.height * n),
 });
</script>

<svg viewbox="0 0 {board} {board}" {...$$props}
     xmlns="http://www.w3.org/2000/svg" version="1.1">
    {#each new Array(n) as _, i}
        <path d="M 0 {i} H {board}"/>
        <path d="M {i} 0 V {board}"/>
    {/each}
    {#each points as [x,y]}
        <circle cx="{x}" cy="{y}" r=0.13 />
    {/each}
    <slot />
    <ClickRect
        {n} x=-0.5 y=-0.5 width="{n}" height="{n}"
        on:piece-place on:piece-hover on:piece-unhover
    />
</svg>

<style>
 svg {
     stroke: black;
     stroke-linecap: square;
     stroke-width: 0.07;
     width: 100%;
     height: 100%;
     overflow: auto;
 }
</style>
