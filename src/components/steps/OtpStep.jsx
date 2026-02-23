import { useState } from "react";
import ErrorMessage from "../common/ErrorMessage";


function VerifyOtpStep({userData,setUserData,nextStep}){

    const [error,setError] = useState("");

    async function handelSubmit(e){
        e.preventDefault();
        

        try{
            const res = await fetch("http://localhost:3000/api/auth/otpVerify",{
                method:"POST",
                headers:{
                    "content-Type":"application/json"
                },
                body:JSON.stringify({
                    email:userData.email,
                    otp:userData.otp})
            });

            const data = await res.json();
            if(!data.success){
                setError(data.message)
                return;
            }
            console.log(data);
            nextStep();
        }catch(err){
            setError(data.message);
            console.log(err)
        }

    }
    return (
        <div>
            <h1>Verify your email</h1>
            <br></br>
            <p>we've emailed a one time security code to <strong>{userData.email}</strong>. It should arrive in the next few minutes. if you don;t see it in your inbox, please check your spam/junk foldr. Please enter it below </p>
            <form onSubmit={handelSubmit}>
                <input
                 type="text"
                 placeholder="Enter 6 digit OTP"
                 onChange={function(e){
                    setUserData({...userData,otp:e.target.value})
                 }}
                  />
                  <button type="submit">Next</button>
                  <ErrorMessage message={error}/>
            </form>
        </div>

    )
}

export default VerifyOtpStep;