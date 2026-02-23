//Email Validation function
export const validateEmail = (email)=>{
    if(!email){
        return "you must provide an email address";
    }

    //Basic email regex
     const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

    if(!emailRegex.test(email)){
        return "Please enter a valid email address"
    }

    return null

}

export const validateName = (name)=>{
    if(!name){
        return "Name is required";
    }

    return null;
}