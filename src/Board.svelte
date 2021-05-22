<script>
 import ClickRect from './ClickRect.svelte';
 export let n = 19;
 export let gap = 15;
 export let turn = 'white';
 $: board = (n-1)*gap;
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
        <path d="M 0 {gap*i} H {board}"/>
        <path d="M {gap*i} 0 V {board}"/>
    {/each}
    {#each points as [x,y]}
        <circle cx="{x*gap}" cy="{y*gap}" r=2 />
    {/each}
</svg>

<style>
 svg {
     stroke: black;
     stroke-linecap: square;
     width: 100%;
     height: 100%;
 }
 svg :global(rect) {
     touch-action: none;
 }
</style>
