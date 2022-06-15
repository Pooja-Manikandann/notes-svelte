<script>
    import ConfirmationModel from "./ConfirmationModel.svelte";
    import validate from "../helpers/validate"
    import Button from "./Button.svelte"
    import store from "../store/noteStore";
    import constant from "../constants/constant"
    import buttonConstants from "../constants/buttonConstants"
    import confirmationModelConstants from "../constants/confirmationModelConstants"
    import validationConstants from "../constants/validationConstants"

    export let count;
    
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
        validateResult.title="";
        validateResult.content=""
        selectedColor="green"
    }

    function selectColor(color){
        console.log(prevSelector+' '+color)
        document.getElementsByClassName("green")[0].childNodes[0].style.display = "none";
        if(prevSelector.length!=0){
            document.getElementsByClassName(prevSelector)[0].childNodes[0].style.display = "none";
        }
        document.getElementsByClassName(color)[0].childNodes[0].style.display = "block";
        prevSelector = color;
        selectedColor = color;
    }

    function create_UUID(){
        var dt = new Date().getTime();
        var uuid = 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
            var r = (dt + Math.random()*16)%16 | 0;
            dt = Math.floor(dt/16);
            return (c=='x' ? r :(r&0x3|0x8)).toString(16);
        });
        return uuid;
    }

    function submitNote(){
        if(title.length == 0 ){
            console.log("inside")
            validateResult.title = validationConstants.EMPTY_TITLE
            return;
        }
        if(content.length == 0){
            validateResult.title = ""
            validateResult.content = validationConstants.EMPTY_CONTENT
            return;
        }
        let result = validate.validateAddNewNoteForm(title, content)
        if(typeof(result) == "object"){
            validateResult = result;
        }
        else{
            validateResult.title="";
            validateResult.content=""
            var date = new Date();
            date = date.getDate() +" "+constant.MONTH_NAMES[date.getMonth()];
            store.persistStore('notes',{
                id: create_UUID(),
                title:title,
                content:content,
                color:selectedColor,
                date:date
            })
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
        border: 3px dashed #cd8489;
        cursor: pointer;
        .add{
            font-size: 7rem;
            color: #9a1e13;
            
        }
    }
    .five{
        width: calc((100% - (4*30px))/5);
    }
    .two{
        width: calc((100% - (30px))/2);
        height: 16rem;
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

<div class="add-new-container {count}" on:click={openAddModel} >
    
    <ion-icon class="add" name="add-circle"></ion-icon>
</div>
{#if openAddModelFlag}    
    <ConfirmationModel className="add" on:closeOverlay={closeAddModel}>
        <h3 slot="header">{confirmationModelConstants.ADD_HEADER}</h3>
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
            <div class="buttonContainer">
                
            </div>
        </form>
        <div slot="footer">
            <Button buttonClass="{buttonConstants.BUTTON_CLASS_NO}" buttonLabel="{buttonConstants.BUTTON_LABEL_CANCEL}" on:no={closeAddModel} />
            <Button buttonClass="{buttonConstants.BUTTON_CLASS_YES}" buttonLabel="{buttonConstants.BUTTON_LABEL_ADD}" on:yes={submitNote} />
        </div>
    </ConfirmationModel>
{/if}