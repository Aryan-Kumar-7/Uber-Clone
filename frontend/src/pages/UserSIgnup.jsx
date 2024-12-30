import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const UserSIgnup = () => {

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [userData, setUserData] = useState({})

  const submitHandler = (e) => {
    e.preventDefault()
    setUserData({
      email: email,
      password: password,
      fullName: {
        firstName: firstName,
        lastName: lastName
      }
    })
    // console.log(userData);


    setEmail('');
    setPassword('');
    setFirstName('');
    setLastName('');
  }

  return (
    <div className='h-screen p-7 w-full flex justify-between flex-col'>
      <div>
        <img className='w-16 mb-10' src="https://upload.wikimedia.org/wikipedia/commons/c/cc/Uber_logo_2018.png" alt="" />
        <form action="" onSubmit={(e) => submitHandler(e)}>
          <h3 className='text-lg font-medium mb-2'>What's your name</h3>
          <div className='flex gap-4 mb-5'>
            <input onChange={(e) => setFirstName(e.target.value)} value={firstName} type="text" className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm' required placeholder='First name' />
            <input onChange={(e) => setLastName(e.target.value)} value={lastName} type="text" className='bg-[#eeeeee] w-1/2 rounded px-4 py-2 border text-base placeholder:text-sm' required placeholder='Last name' />
          </div>

          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input onChange={(e) => setEmail(e.target.value)} value={email} type="email" className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm' required placeholder='example@gmail.com' />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input onChange={(e) => setPassword(e.target.value)} value={password} type="password" className='bg-[#eeeeee] mb-5 rounded px-4 py-2 border w-full text-base placeholder:text-sm' required placeholder='password' />

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        </form>
        <p className='text-center'>Already have a account? <Link to='/login' className='text-blue-600'>Login here</Link></p>
      </div>
      <div>
        <p className='text-[10px] leading-tight'>This site is protected by reCAPTCHA and the <span className='underline'>Google Privacy & Policy</span> and <span className='underline'>Terms of Services apply</span>.</p>
      </div>
    </div>
  )
}

export default UserSIgnup