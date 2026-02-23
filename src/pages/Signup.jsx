import React, { useState } from 'react'
import EmailStep from "../components/SignupSteps/EmailStep"
import OtpVerificationStep from '../components/SignupSteps/OtpVerificationStep'
import PersonalInfoStep from '../components/SignupSteps/PersonalInfoStep'

const Signup = () => {

  const [currentStep,setCurrentStep] = useState(1);
  const [userData,setUserData] = useState({
    email:"",
    otp:"",
    firstName:"",
    lastName:"",
    password:""
  });

  const updateUserData = (data) =>{
    setUserData(prev =>({...prev,...data}));
  }


  const nextStep = () => setCurrentStep((prev) => prev + 1);
  // const prevStep = () => setCurrentStep((prev) => prev - 1);

  switch (currentStep){
    case 1:
      return (
        <EmailStep 
        userData={userData}
        updateUserData={updateUserData}
        nextStep={nextStep}

        />
      )
    case 2:
      return (
        <OtpVerificationStep
        userData={userData}
        updateUserData={updateUserData}
        nextStep={nextStep}
         />
      )

    case 3:
      return(
        <PersonalInfoStep 
        userData={userData}
        updateUserData={updateUserData}
        nextStep={nextStep}
        />
      )
  }

}

export default Signup
