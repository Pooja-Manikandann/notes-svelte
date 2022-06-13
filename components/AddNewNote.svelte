<script>
    import ConfirmationModel from "./ConfirmationModel.svelte";
    import validate from "../helpers/validate"
    import noteStore from "../helpers/noteStore"
    
    let openAddModelFlag = false;
    let prevSelector="green";
    let selectedColor="green";
    let title="";
    let content="";
    let validateResult={
        title:"",
        content:""
    };    
    
    function openAddModel(){
        openAddModelFlag = true;
    }

    function closeAddModel(){
        openAddModelFlag = false;
        title="";
        content="";
        selectedColor="green"
    }

    function selectColor(color){
        if(prevSelector.length!=0){
            document.getElementsByClassName(prevSelector)[0].childNodes[0].style.display = "none";
        }
        document.getElementsByClassName(color)[0].childNodes[0].style.display = "block";
        prevSelector = color;
        selectedColor = color;
    }

    function submitNote(){
        console.log(title)
        if(title.length == 0 ){
            console.log("inside")
            validateResult.title = "Empty title is not accepted"
            return;
        }
        if(content.length == 0){
            validateResult.title = ""
            validateResult.content = "Empty content is not accepted"
            return;
        }
        let result = validate.validateAddNewNoteForm(title, content)
        if(typeof(result) == "object"){
            validateResult = result;
        }
        else{
            validateResult.title="";
            validateResult.content=""
            noteStore.addNote({
                title:title,
                content:content,
                color:selectedColor
            })
            noteStore.getAllNotes();
            closeAddModel();

        }
    }
</script>

<style lang="scss">
    .add-new-container{
        display: flex;
        justify-content: center;
        align-items: center;
        height: 24rem;
        width: 15.875rem;
        border: 3px dashed #cd8489;
        .add{
            font-size: 7rem;
            color: #9a1e13;
            cursor: pointer;
        }
    }
    form{
        input{
            display: block;
            width: 100%;
            height: 50px;
        }
        textarea{
            resize: none;
            height: 300px;
            width: 100%;
        }
        span{
            margin: 10px 0;
            font-size: 12px;
            color: #9a1e13;
        }
    }
    .color-picker{
        display: flex;
        gap: 20px;
        div{
            display: flex;
            gap: 8px;
            .color{
                width: 25px;
                height: 25px;
                cursor: pointer;
                ion-icon{
                    margin: auto;
                    display: none;
                }
            }
            .green{
                background-color: #c2e89b;
                ion-icon{
                    display: block;
                }
                
            }
            .blue{
                background-color: #d5e2f6;
            }
            .grey{
                background-color: #dededf;
            }
            .red{
                background-color: #dacecf;
            }
        }
    }

</style>

<div class="add-new-container">
    
    <ion-icon class="add" name="add-circle" on:click={openAddModel}></ion-icon>
</div>
{#if openAddModelFlag}    
    <ConfirmationModel>
        <h3 slot="header">NEW NOTE</h3>
        <form action="" slot="content">
            <input type="text" name="title" id="title" placeholder="Note title" bind:value="{title}">
            <span>{validateResult.title}</span>
            <!-- <input type="text" name="content" id="content" placeholder="Say Something" bind:value="{content}"> -->
            <textarea name="content" id="content"  placeholder="Say Something" bind:value="{content}"></textarea>
            <span>{validateResult.content}</span>
            <div class="color-picker">
                <p>Notes Background</p>
                <div>
                    <div on:click={() => selectColor("green")} class="color green"><ion-icon name="checkmark-outline"></ion-icon></div>
                    <div on:click={() => selectColor("blue")}  class="color blue"><ion-icon name="checkmark-outline"></ion-icon></div>
                    <div on:click={() => selectColor("grey")}  class="color grey"><ion-icon name="checkmark-outline"></ion-icon></div>
                    <div  on:click={() => selectColor("red")} class="color red"><ion-icon name="checkmark-outline"></ion-icon></div>
                </div>
                
            </div>
            <button on:click|preventDefault={closeAddModel}>Cancel</button>
            <button on:click|preventDefault="{submitNote}">Add</button>
        </form>
    </ConfirmationModel>
{/if}