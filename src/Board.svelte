<script>
 export let n = 19;
 export let border = n;
 export let gap = 15;
 export let turn = 'white';
 $: board = (n-1)*gap;
 $: canvas = board+border*2;
 function getStarPoints(n) {
     const depth = n >= 13 ? 3 : 2;
     const center = n % 2 && Math.floor(n/2);
     const edges = n > 13 && center;
     let points = [];
     // Corners
     points.push([depth, depth], [depth, n-1-depth], [n-1-depth, depth], [n-1-depth, n-1-depth]);
     if (edges) {
         points.push([edges, depth], [n-1-depth, edges], [edges, n-1-depth], [depth, edges]);
     }
     if (center) {
         points.push([center, center]);
     }
     return points;
 }
 $: points = getStarPoints(n);
 const getPos = (e, r) => ({
     x: Math.floor((e.clientX - r.x) / r.width * n),
     y: Math.floor((e.clientY - r.y) / r.height * n),
 });
 let hoverPos;
 const hover = e => {
     if (e.isPrimary)
         hoverPos = getPos(e, e.originalTarget.getBoundingClientRect());
 };
 const unhover = e => {
     hoverPos = false;
 };
 import {createEventDispatcher} from 'svelte';
 const dispatch = createEventDispatcher();
 const click = e => {
     const pos = getPos(e, e.originalTarget.getBoundingClientRect());
     alert(JSON.stringify(pos));
     dispatch('place-piece', pos);
 };
</script>

<svg viewbox="0 0 {canvas} {canvas}"
     {...$$props}
     xmlns="http://www.w3.org/2000/svg" version="1.1">
    {#each new Array(n) as n, i}
        <path d="M {border} {border+gap*i} H {board+border}"/>
        <path d="M {border+gap*i} {border} V {board+border}"/>
    {/each}
    {#each points as [x,y]}
        <circle cx={border+x*gap} cy={border+y*gap} r=2 />
    {/each}
    {#if hoverPos}
        <circle
            cx={border+hoverPos.x*gap} cy={border+hoverPos.y*gap}
            r=6 fill={turn} stroke="none" opacity="0.5" />
    {/if}
    <rect
        x="{border-gap/2}" y="{border-gap/2}"
        width="{gap*n}" height="{gap*n}"
        stroke="none" opacity="0"
        on:pointerover="{hover}" on:pointermove="{hover}" on:pointerleave="{unhover}"
        on:pointerup="{click}"
    />
</svg>

<style>
 svg {
     stroke: black;
     stroke-linecap: square;
     background: #dcb35c;
     width: 100vmin;
     height: 100vmin;
 }
 svg rect {
     touch-action: none;
 }
</style>
