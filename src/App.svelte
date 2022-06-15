<script>
	import Header from "./components/Header.svelte";
	import NotesContainer from "./components/NotesContainer.svelte";

	let count;
</script>

<main>
	<Header  bind:columnCount={count} />
	<NotesContainer count={count} />

</main>

<style>
	
</style>