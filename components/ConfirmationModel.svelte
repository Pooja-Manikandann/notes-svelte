<script>
    export let className;

</script>

<style lang="scss">
    .overlay{
        position: fixed;
        width: 100%;
        height: 100%;
        top: 0;
        left: 0;
        right: 0;
        bottom: 0;
        background-color: rgba(0,0,0,0.5);
        z-index: 2;
        cursor: pointer; 
    }
    .delete{
        width: 550px;
        top: 40vh;
        left: 600px;
        margin: 0 auto;
        .content{
            font-size: 17px;
        }
    }

    .add{
        width: 700px;
        top: 25vh;
        left: 500px;
    }
    .model{
        display: flex;
        flex-direction: column;
        justify-content: center;
        align-items: center; 
        position: fixed;
        z-index: 4;
        background-color: #fff;
        
        
        .header{
            padding: 1rem 0;
            font-size: 20px;
        }
        .content{
            width: 100%;
            padding: 0 2rem;
        }

        .footer{
            padding: 20px;
        }
    }

</style>


<div class="overlay"></div>

<div class="model {className}">
    <div class="header">
        <slot name="header" />
    </div>

    <div class="content">
        <slot name="content" />
    </div>

    <div class="footer">
        <slot name="footer" />
    </div>

</div>

