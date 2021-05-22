<script>
 import Board from './Board.svelte';
</script>

<svg viewbox="0 0 100 100" {...$$props}
     xmlns="http://www.w3.org/2000/svg" version="1.1">
    <Board n={9} />
</svg>
