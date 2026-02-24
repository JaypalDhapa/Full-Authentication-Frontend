import React from 'react'
import { Link } from 'react-router-dom'

const home = () => {
  return (
    <div className='min-h-screen bg-gray-50 flex items-center flex-col justify-center px-4 gap-5 '>
      <img
       src="https://media.licdn.com/dms/image/v2/D4E03AQGEbC_JhrcoIA/profile-displayphoto-shrink_400_400/B4EZcu8Wy9G4Ao-/0/1748839265568?e=2147483647&v=beta&t=aWLjSTL6yyAI0yD4jy_BhR0KqUWH00p5124oc-72f-A" 
       alt="jaypal" 
       className='w-50 h-50 rounded-full'
        />
      <h1 className='text-4xl text-bold font-bold'>Full Authentication System</h1>
      <p>Full Authenticaion System where user can Signup with Google,Facebook,Microsoft and type manually email </p>
      <Link 
      to="/signup"
      className='bg-sky-500 px-4 py-2 text-white cursor-pointer'
      >signup</Link>
    </div>
  )
}

export default home
