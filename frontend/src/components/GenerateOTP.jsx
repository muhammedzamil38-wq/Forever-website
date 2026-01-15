import React,{useState, useEffect} from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { useContext } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useLocation } from 'react-router-dom'

const GenerateOTP = () => {
    const [email,setEmail] = useState('')
    const {backendurl,navigate} = useContext(ShopContext)
    const location = useLocation();

    useEffect(() => {
        if (location.state?.email) {
            // eslint-disable-next-line react-hooks/set-state-in-effect
            setEmail(location.state.email)
        }
    }, [location.state])

    const handleSubmit = async (e) => {
        e.preventDefault()
        try {
            const response = await axios.post(backendurl + '/api/user/generate-otp',{email})
            if (response.data.success) {
                toast.success(response.data.message)
                navigate('/verify-otp',{state:{email}})
            }
        } catch (error) {
            console.log(error)
            toast.error(error.message)
        }
    }
  return (
    <div className='max-w-100 m-auto p-5 bg-[#f9f9f9] rounded-sm shadow-lg '>
      <h2>Generate otp</h2>
      <form className='w-75 m-12.5 p-5 border border-[#ccc] rounded-sm' onSubmit={handleSubmit}>
        <label>Email</label>
        <input type="email" value={email} onChange={(e)=>setEmail(e.target.value)} required/>
        <button type='submit'>Generate OTP</button>
      </form>
    </div>
  )
}

export default GenerateOTP
