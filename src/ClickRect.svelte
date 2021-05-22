<script>
 import {createEventDispatcher} from 'svelte';
 const dispatch = createEventDispatcher();

 export let x, y, width, height, n;

 const getPos = (e, r) => ({
     x: Math.floor((e.clientX - r.x) / r.width * n),
     y: Math.floor((e.clientY - r.y) / r.height * n),
 });
 const hover = e => e.isPrimary && dispatch(
     'piece-hover',
     getPos(e, e.originalTarget.getBoundingClientRect())
 );
 const unhover = e => dispatch('piece-unhover');
 const click = e => dispatch(
     'piece-place',
     getPos(e, e.originalTarget.getBoundingClientRect())
 );
</script>

<rect
    {x} {y} {width} {height} stroke=none opacity=0
    on:pointerover="{hover}"
    on:pointermove="{hover}"
    on:pointerleave="{unhover}"
    on:pointerup="{click}"
>
    <text></text>
</rect>
