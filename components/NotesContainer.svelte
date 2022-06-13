<script>
    import { onMount } from "svelte";
    import AddNewNote from "./AddNewNote.svelte";
    import noteStore from "../helpers/noteStore";
    import Note from "./Note.svelte"
    
    let notes=[];

    onMount(()=>{
        notes = noteStore.getAllNotes();
    })

</script>

<style>
    .notes-container{
        display: flex;
        gap: 20px;
        padding: 3rem;
        border: 1px solid black;
    }

    .header{
        font-size: 1.5rem;
        padding: 0.75rem 0;
    }

    .content{
        padding: 0.75rem 0;
    }

    .footer{
        font-size: 10px;
        font-weight: 700;
        color: #646568;
    }
</style>

<div class="notes-container">
    <AddNewNote />

    {#each notes as note}
        <Note color={note.color}>
            
            <div class="header" slot="header">{note.title}</div>
            <div class="content" slot="content">{note.content}</div>
            <div class="footer" slot="footer">{note.date}</div>
        </Note>
    {/each}

</div>