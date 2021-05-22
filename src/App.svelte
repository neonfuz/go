<script>
 import Game from './Game.svelte';
</script>

<div class="container">
	<Game />
</div>

<style>
 :global(body) {
	 overflow: hidden;
 }
 .container {
	 display: flex;
	 flex-direction: row;
	 flex-wrap: wrap;
	 overflow: hidden;
 }
 .container :global(svg) {
     width: 100vmin;
     height: 100vmin;
 }
</style>
