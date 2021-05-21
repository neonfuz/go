<script>
 import Board from './Board.svelte';
</script>

<div class="container">
	<Board n={9} width="100%" height="100%" />
	<Board n={13} />
	<Board />
</div>

<style>
 :global(body) {
	 overflow: hidden;
 }
 .container {
	 display: flex;
	 flex-basis: 50%;
	 flex-wrap: wrap;
	 overflow: hidden;
	 max-height: 80vh;
 }
</style>
