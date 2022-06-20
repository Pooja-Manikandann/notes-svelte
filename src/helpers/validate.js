import validationConstant from "../constants/validationConstants";

const validate = {
    validateAddNewNoteForm :  (title, content) => {
        if(title.length <= 60 && content.length<= 255){
            return true;
        }
        else{
            if(content.length > 255 && title.length > 60){
                return{
                    title: validationConstant.MAXLENGTH_TITLE,
                    content: validationConstant.MAXLENGTH_CONTENT
                }
            }
            else if(title.length > 60){
                return{
                    title: validationConstant.MAXLENGTH_TITLE,
                    content: ""
                }
            }
            else if(content.length > 255){
                return{
                    title: "",
                    content: validationConstant.MAXLENGTH_CONTENT
                }
            }
        }
    }
}

export default validate;
    