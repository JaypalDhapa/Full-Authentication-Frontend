import React from "react"
import { useState } from "react";
import { validateName } from "../../utils/validation";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../common/LoadingSpinner";

function PasswordStep({userData,setUserData,nextStep}){

    const [error,setError] = useState("");
    const [loding,setLoading] = useState(false);

    async function handleSubmit(e){
        e.preventDefault();
        const firstNameError = validateName(userData.firstName);
        const lastNameError = validateName(userData.lastName);

        if(firstNameError){
            setError("Firs Name is required");
            return;
        }
        if(lastNameError){
            setError("Last Name is required");
            return;
        }


        setLoading(true)
        try{
            const res = await fetch("http://localhost:3000/api/auth/register",{
                method:"POST",
                headers:{
                    "Content-Type":"application/json"
                },
                body:JSON.stringify(userData)
            });
    
            const data = await res.json();
            if(!data.success){
                console.log(data.message);
                setError(data.message)
                setLoading(false)
                return;
            }
            
            nextStep();
        }catch(err){
            setLoading(false)
            setError("server error")
            console.log("error",err);
        }
        setLoading(false)
    }
    return (
        <div>
            <h1>Hello form password</h1>
            <p>{userData.email}</p>
            <form onSubmit={handleSubmit}>
            <input
             type="text"
             placeholder="First Name"
             onChange={function(e){
                setUserData({...userData,firstName:e.target.value.trim()})
             }}
              />
              <br></br>
              <br></br>
              <input
               type="text"
               placeholder="Last Name"
               onChange={function(e){
                setUserData({...userData,lastName:e.target.value.trim()})
               }}
                />

                <input 
                type="password"
                placeholder="enter your password"
                onChange={function(e){
                    setUserData({...userData,password:e.target.value})
                }}
                 />

              <br></br>
              <br></br>
                <button 
                type="submit"
                >
                {loding ? <Loader /> : "Create Account"}
                </button>
               <ErrorMessage message={error}/>
            </form>
        </div>
    )
}

export default PasswordStep;