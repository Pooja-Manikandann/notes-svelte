<script>
    export let buttonLabel;
    export let buttonClass;

    import { createEventDispatcher } from "svelte";

    let dispatch = createEventDispatcher();

    function callEvent(){
        if(buttonClass == 'no'){
            no();
        }
        else if(buttonClass == 'yes'){
            yes();
        }
    }

    function no(){
        dispatch('no','clicked')
    }

    function yes(){
        dispatch('yes','clicked')
    }
    
</script>

<style>
    button{
        width: 110px;
        padding: 10px 25px;
        border: none;
        font-weight: 700;
        cursor: pointer;
    }
    .no{
        background-color: #eeeeee;
        margin-right: 20px;
    }

    .yes{
        background-color: #9a1e13;
        color: #fff;
    }
</style>

<button on:click|preventDefault={callEvent} class="{buttonClass}">{buttonLabel.toUpperCase()}</button>