<script>
    import ConfirmationModel from "./ConfirmationModel.svelte";
    export let color;

    let showDeleteModelFlag = false;

    function showDeleteModel(){
        showDeleteModelFlag = true;
    }

    function closeDeleteModel(){
        showDeleteModelFlag = false
    }

    function deleteNote(){

    }
</script>

<style lang="scss">
    .note{
        height: 24rem;
        width: 15.875rem;
        .header{
            padding: 0 1rem;
        }
        .content{
            padding: 0 1rem;
            height: 75%;
        }
        .footer{
            display: flex;
            justify-content: space-between;
            align-items: center;
            padding: 0.5rem 1rem;
            
            ion-icon{
                color: rgb(31,33,36);
                font-size: 18px;
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

<div class="note {color}">
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

<ConfirmationModel>
    <h3 slot="header">Confirm Delete</h3>
    <div slot="content">
        <p>
            Deleting this note will remove all its traced from the system and cannot be rolled back. Do you really wish to delete this note
        </p>
        <button on:click|preventDefault={closeDeleteModel}>NO</button>
        <button on:click|preventDefault={deleteNote}>YES</button>
    </div>
</ConfirmationModel>