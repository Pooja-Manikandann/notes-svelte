<script>
    import { onMount, onDestroy } from "svelte";
    import AddNewNote from "./AddNewNote.svelte";
    import Note from "./Note.svelte"
    import store from "../store/noteStore";

    export let count;
    
    const getStore = store.retrieveStore("notes")

</script>

<style>
    .notes-container{
        display: flex;
        flex-wrap: wrap;
        gap: 30px;
        padding: 2rem 4rem;
    }

    .header{
        white-space: nowrap;
        overflow: hidden;
        text-overflow: ellipsis;
        font-size: 1.5rem;
        padding: 0.75rem 0;
    }

    .content{
        padding: 0.75rem 0;
        font-size: 13px;
        word-spacing: 3px;
        text-align: justify;
    }

    .footer{
        font-size: 10px;
        font-weight: 700;
        color: #646568;
    }
</style>

<div class="notes-container">
    <AddNewNote count={count} />

    {#each $getStore as note (note.id)}
        <Note id={note.id} color={note.color} count={count}>
            
            <div class="header" slot="header">{note.title}</div>
            <div class="content" slot="content">{note.content}</div>
            <div class="footer" slot="footer">{note.date}</div>
        </Note>
    {/each}

</div>