import { useState } from "react"
import api from "../../utils/api"
import { useNavigate } from "react-router-dom"

function PersonalInfoStep({ email,userData,updateUserData }) {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    password: "",
    confirmPassword: "",
  })

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const handleSubmit = async (e) => {
    e.preventDefault()

    if (formData.password !== formData.confirmPassword) {
      alert("Passwords don'not match")
      return
    }

    const finalData = {
      email:userData.email,
      otp:userData.otp,
      firstName:formData.firstName,
      lastName:formData.lastName,
      password:formData.password
    }
    try{

      console.log(finalData);
      const res = await api.post("/register",finalData);
      updateUserData({firstName:formData.firstName,lastName:formData.lastName,password:formData.password});
      if(res.data.success){
        localStorage.setItem("token", res.data.token);
        navigate("/profile");
      }

    }catch(err){
      console.log(err.response.data);
      alert("err in final step")
    }
 
  

    // Send to backend here
  }

  return (
    <div className="min-h-screen bg-gray-50 flex items-center justify-center px-4">
    <div className="w-full max-w-md bg-white rounded-2xl shadow-xl p-6 sm:p-8">
      <h2 className="text-2xl font-bold text-center mb-2">
        Complete Your Profile
      </h2>

      <p className="text-center text-gray-500 text-sm mb-6">
        Almost done! Finish setting up your account.
      </p>

      <form onSubmit={handleSubmit} className="space-y-4">

        {/* Email Display */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Email
          </label>
          <input
            type="email"
            value={userData.email}
            readOnly
            className="w-full mt-1 border border-gray-200 bg-gray-100 rounded-lg px-4 py-3 text-gray-500 cursor-not-allowed"
          />
        </div>

        {/* First Name */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            First Name
          </label>
          <input
            type="text"
            name="firstName"
            value={formData.firstName}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Last Name */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Last Name
          </label>
          <input
            type="text"
            name="lastName"
            value={formData.lastName}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Password */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Password
          </label>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Confirm Password */}
        <div>
          <label className="text-sm font-medium text-gray-600">
            Confirm Password
          </label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            className="w-full mt-1 border border-gray-300 rounded-lg px-4 py-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          />
        </div>

        {/* Submit Button */}
        <button
          type="submit"
          className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition font-medium mt-2"
        >
          Create Account
        </button>

      </form>
    </div>
    </div>
  )
}

export default PersonalInfoStep;