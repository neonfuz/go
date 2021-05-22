<script>
 import {createEventDispatcher} from 'svelte';
 const dispatch = createEventDispatcher();

 export let x, y, width, height, n, hoverPos;

 const getPos = (e, r) => ({
     x: Math.floor((e.clientX - r.x) / r.width * n),
     y: Math.floor((e.clientY - r.y) / r.height * n),
 });
 const hover = e => {
     if (e.isPrimary)
         hoverPos = getPos(e, e.originalTarget.getBoundingClientRect());
 };
 const unhover = e => {
     hoverPos = false;
 };
 const click = e => {
     const pos = getPos(e, e.originalTarget.getBoundingClientRect());
     alert(JSON.stringify(pos));
     dispatch('place-piece', pos);
 };
</script>

<rect
    {x} {y} {width} {height}
    stroke="none" opacity="0"
    on:pointerover="{hover}" on:pointermove="{hover}" on:pointerleave="{unhover}"
    on:pointerup="{click}"
/>
