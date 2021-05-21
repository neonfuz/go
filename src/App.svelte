<script>
 import Board from './Board.svelte';
</script>

<div class="container">
	<Board n={9} />
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
</style>
