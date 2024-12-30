import React, { useState } from 'react'
import { Link } from 'react-router-dom'

const CaptionLogin = () => {

  const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [captionData, setCaptionData] = useState({})
  
    const submitHandler = (e) => {
      e.preventDefault()
      setCaptionData({
        email:email,
        password:password
      })
  
      // console.log(captionData)
  
      setEmail('');
      setPassword('');
    }

  return (
    <div className='h-screen p-7 w-full flex justify-between flex-col'>
      <div>
        <img className='w-16 mb-3' src="https://www.svgrepo.com/show/505031/uber-driver.svg" alt="" />
        <form action="" onSubmit={(e) => submitHandler(e)}>
          <h3 className='text-lg font-medium mb-2'>What's your email</h3>
          <input onChange={(e) => { setEmail(e.target.value) }} value={email} type="email" className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required placeholder='example@gmail.com' />

          <h3 className='text-lg font-medium mb-2'>Enter Password</h3>
          <input onChange={(e) => { setPassword(e.target.value) }} value={password} type="password" className='bg-[#eeeeee] mb-7 rounded px-4 py-2 border w-full text-lg placeholder:text-base' required placeholder='password' />

          <button className='bg-[#111] text-white font-semibold mb-3 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Login</button>
        </form>
        <p className='text-center'>Join a fleet? <Link to='/caption-signup' className='text-blue-600'>Register as Caption</Link></p>
      </div>
      <div>
        <Link to='/login' className='flex items-center justify-center bg-[#d5622d] text-white font-semibold mb-5 rounded px-4 py-2 w-full text-lg placeholder:text-base'>Sign in as User</Link>
      </div>
    </div>
  )
}

export default CaptionLogin