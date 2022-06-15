<script>
    import ConfirmationModel from "./ConfirmationModel.svelte";
    import Button from "./Button.svelte";
    import store from "../store/noteStore";
    import buttonConstants from "../constants/buttonConstants";
    import constant from "../constants/constant";
    import confirmationModelConstants from "../constants/confirmationModelConstants"

    export let color;
    export let count;
    export let id;

    if(count == "5"){
        count = constant.COLUMN_5
    }
    if(count == "2"){
        count = constant.COLUMN_2
    }

    let showDeleteModelFlag = false;

    function showDeleteModel(){
        showDeleteModelFlag = true;
    }

    function closeDeleteModel(){
        showDeleteModelFlag = false
    }

    function deleteNote(){
        store.deleteItem("notes",id);
        showDeleteModelFlag=false
    }
</script>

<style lang="scss">
    .five{
        width: calc((100% - (4*30px))/5);
        height: 24rem;
        .content{
            height: 75%;
        }
    }
    .two{
        width: calc((100% - 30px)/2);
        height: 16rem;
        .content{
            height: 60%;
        }
    }
    .note{
        .header{
            padding: 0 1rem;
        }
        .content{
            padding: 0 1rem;
            overflow: auto;
        }
        .footer{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 1rem;
            
            ion-icon{
                color: #1f2124;
                font-size: 18px;
                cursor: pointer;
            }
        }
    }
    .green{
        background-color: #c2e89b; 
        .header{
            background-color: #aed082;
        }
    }
    .blue{
        background-color: #d5e2f6;
        .header{
            background-color: #bfcbdf;
        }
    }
    .grey{
        background-color: #dededf;
        .header{
            background-color: #cbcbd0;
        }
    }
    .red{
        background-color: #dacecf;
        .header{
            background-color: #cbbfc1;
        }
    }

</style>

<div class="note {color} {count}">
    <div class="header">
        <slot name="header" />
    </div>
    <div class="content">
        <slot name="content" />
    </div>
    <div class="footer">
        <slot name="footer" />
        <ion-icon name="trash-outline" on:click="{showDeleteModel}"></ion-icon>
    </div>
</div>

{#if showDeleteModelFlag}

    <ConfirmationModel className="delete" on:closeOverlay={closeDeleteModel}>
        <h3 slot="header">{confirmationModelConstants.DELETE_HEADER}</h3>
        <div slot="content">
            <p>{confirmationModelConstants.DELETE_CONTENT}</p>
        </div>
        <div slot="footer">
            <Button buttonClass="{buttonConstants.BUTTON_CLASS_NO}" buttonLabel="{buttonConstants.BUTTON_LABEL_NO}" on:no={closeDeleteModel} />
            <Button buttonClass="{buttonConstants.BUTTON_CLASS_YES}" buttonLabel="{buttonConstants.BUTTON_LABEL_YES}" on:yes={deleteNote} />
        </div>
    </ConfirmationModel>
{/if}
