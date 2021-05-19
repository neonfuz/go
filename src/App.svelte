<script>
	import Board from './Board.svelte';
</script>

<div class="container">
	<Board n={9} />
	<Board n={13} />
	<Board />
</div>

<style>
	.container {
		display: flex;
		flex-basis: 50%;
		flex-wrap: wrap;
	}
</style>