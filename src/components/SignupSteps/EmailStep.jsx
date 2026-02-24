import React,{ useState } from "react";
import api from "../../utils/api";
import googleIcon from "../../assets/icons/google.svg";
import appleIcon from "../../assets/icons/apple.svg";
import microsoftIcon from "../../assets/icons/microsoft.svg";
import SocialButton from "../../components/SocialButton";
import Devider from "../../components/Divider";
import ErrorMessage from "../common/ErrorMessage";
import Loader from "../common/LoadingSpinner";
import { validateEmail } from "../../utils/validation";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";


function EmailStep({userData,updateUserData,nextStep}) {

  const [email,setEmail] = useState("");
  const [error,setError] = useState("");
  const [loading,setLoading] = useState(false)

  function showToast(msg){
    toast.error(msg)
 }

  const handelSubmit = async (e)=>{
    e.preventDefault();
    const emailError = validateEmail(email)
    if(emailError){
      setError(emailError);
      return ;
    }

    setLoading(true);
    try{
      const res = await api.post("/sendOtp",{email})
      
      if(!res.data.success){
        showToast(res.data.message);
        setError(res.data.message);
        setLoading(false);
        return;
      }
      updateUserData({email})
      nextStep();
    }catch(err){
      showToast("server errro");
      console.log("Error",err);
      setError("server Error")
    }

    setLoading(false);
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
      <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
        <h1 className="text-2xl sm:text-3xl font-bold text-center mb-6">
          Create your account
        </h1>

        {/* Social Buttons Here */}
  
    <SocialButton icon={googleIcon} text="Continue with Google"/>
    <SocialButton icon={appleIcon} text="Continue with Apple"/>
    <SocialButton icon={microsoftIcon} text="Continue with Microsoft"/>


<Devider />

<form onSubmit={handelSubmit}>
<input
  type="email"
  placeholder="Enter your email"
  className={`w-full rounded-lg px-4 py-3   focus:outline-none focus:ring-2 focus:ring-blue-500
    ${error 
      ? "border border-red-500 text-red-500 focus:ring-red-200"
      :"border border-gray-300 text-black focus:ring-blue-500"
    }`
  }
  onChange={function(e){
    setEmail(e.target.value)
  }}
/>

<ErrorMessage message={error}/>

<button type="submit" className="w-full bg-blue-600 text-white rounded-lg py-3 mt-4 hover:bg-blue-700 transition font-medium">
  {loading ? <Loader /> : "Continue with Email"}
</button>
</form>

<ToastContainer/> 

      </div>
    </div>
  )
}

export default EmailStep