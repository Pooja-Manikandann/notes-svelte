<script>
    let columnCount;
    
    $: console.log(columnCount)

    function showDefault(){
        columnCount = "5";
        console.log('show default called..')
    }
</script>

    
<style lang="scss">
    .header{
        display: flex;
        justify-content: space-between;
        align-items: center;
        padding: 1.5rem 3rem;
        background-color: #9a1e13;
        color: #fff;
        .title{
            font-size: 1.5rem;
            font-weight: 600;
            letter-spacing: 2px;
        }
        .view-selection-container{
            display: flex;
            align-items: center;
            gap: 1.5rem;
            p{
                font-size: 1.2rem;
                font-weight: 500;
                cursor: pointer;
            }
            select{
                margin: 0;
                width: 230px;
                border-radius: 0;
                background-color: #eeeeee;
            }
        }
    }
</style>

<div class="header">
    <div class="title">POCKET NOTES</div>
    <div class="view-selection-container">
        <p on:click={showDefault}>Default View</p>
        <select name="column" id="" bind:value="{columnCount}">
            <option value="5" >5 Column format</option>
            <option value="2">2 Column format</option>
        </select>          
    </div>
</div>