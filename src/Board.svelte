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
     points.push([depth, depth]);
     points.push([depth, n-1-depth]);
     points.push([n-1-depth, depth]);
     points.push([n-1-depth, n-1-depth]);
     if (edges) {
         points.push([edges, depth]);
         points.push([n-1-depth, edges]);
         points.push([edges, n-1-depth]);
         points.push([depth, edges]);
     }
     if (center) {
         points.push([center, center]);
     }
     return points;
 }
 $: points = getStarPoints(n);
 let hoverPos;
 const hover = (x,y) => e => {
     hoverPos = {x, y};
 };
 const unhover = (x, y) => e => {
     hoverPos = false;
 }
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
    {#each new Array(n) as _, x}
        {#each new Array(n) as _, y}
            <rect x={border+x*gap-gap/2} y={border+y*gap-gap/2}
                  width={gap} height={gap}
                  fill="black" stroke="none" opacity="0"
                  on:pointerenter={hover(x,y)} on:pointerout{unhover(x,y)} />
        {/each}
    {/each}
    {#if hoverPos}
        <circle
            cx={border+hoverPos.x*gap} cy={border+hoverPos.y*gap}
            r=6 fill={turn} stroke="none" opacity="0.5" />
    {/if}
</svg>

<style>
 svg {
     stroke: black;
     stroke-linecap: square;
     background: #dcb35c;
 }
</style>
