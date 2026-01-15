import axios from 'axios'
import React from 'react'
import { useContext } from 'react'
import { useState } from 'react'
import { useLocation } from 'react-router-dom'
import { ShopContext } from '../context/ShopContext'
import { toast } from 'react-toastify'

const VerifyOTP = () => {
    const [otp,setOtp] = useState('')
    const {backendurl,navigate, setToken} = useContext(ShopContext)
    const location = useLocation();
    let email = location.state?.email

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendurl+'/api/user/verify-otp',{email,otp})
            if (response.data.success) {
                toast.success(response.data.message)
                setToken(response.data.token)
                localStorage.setItem("token", response.data.token)
                navigate('/')
            }else{
                toast.error(response.data.message
                    
                )
            }
        } catch (error) {
            console.log(error);
            toast.error(error.message)
        }
    }
    
  return (
    <div className='max-w-100 m-auto p-5 bg-[#f9f9f9] rounded-sm shadow-lg'>
      <h2>Verify OTP</h2>
      <form  className='w-75 m-12.5 p-5 border border-[#ccc] rounded-sm' onSubmit={handleSubmit}>
        <label className='font-bold text-2xl text-black'>OTP: </label>
        <input className='w-full p-2.5 m-2.5 border border-[#ccc] rounded-sm' type="text" value={otp} onChange={(e)=>setOtp(e.target.value)} required/>
        <button className='w-full p-2.5 bg-[#28a745] text-white border-0 rounded-sm cursor-pointer hover:bg-[#218838]' type='submit'>Verify OTP</button>
      </form>
    </div>
  )
}

export default VerifyOTP
