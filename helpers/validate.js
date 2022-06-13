const validate = {
    validateAddNewNoteForm :  (title, content) => {
        if(title.length <= 60 && content.length<= 255){
            return true;
        }
        else{
            console.log(content.length)
            if(content.length > 255 && title.length > 60){
                return{
                    title: "Max char exceeded enter within 60",
                    content: "Max char exceeded enter within 255"
                }
            }
            else if(title.length > 60){
                return{
                    title: "Max char exceeded enter within 60",
                    content: ""
                }
            }
            else if(content.length > 2550){
                return{
                    title: "",
                    content: "Max char exceeded enter within 255"
                }
            }
        }
    }
}

export default validate;
    