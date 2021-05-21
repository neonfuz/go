<script>
 import Board from './Board.svelte';
</script>

<div class="container">
	<Board n={9} width="100vh" height="100vh" />
	<Board n={13} width="100vh" height="100vh"  />
	<Board width="100vh" height="100vh" />
</div>

<style>
 :global(body) {
	 overflow: hidden;
 }
 .container {
	 display: flex;
	 flex-direction: row;
	 flex-wrap: wrap;
	 overflow: auto;
	 max-height: 100vh;
	 max-width: 100vw;
 }
</style>
