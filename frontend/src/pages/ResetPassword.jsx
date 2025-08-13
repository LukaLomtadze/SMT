import React, { useState } from 'react'
import Input from '../components/Input'
import { FaLock } from 'react-icons/fa'
import { useAuthStore } from '../stateManagment/authStore'
import Button from '../components/Button'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'
import toast from 'react-hot-toast'
import { useNavigate, useParams } from 'react-router-dom'

const ResetPassword = () => {

    const[password, setPassword] = useState("")
    const[repeatedPass, setRepeatedPass] = useState("")

    const{isLoading, resetPassword, error, message} = useAuthStore()
    const {token} = useParams()
    const navigate = useNavigate()

    const handleSubmit =  async(e) => {
        e.preventDefault()
        if(password !== repeatedPass){
            return toast.error("Please repeat password correctly")
        }
        try{
            await resetPassword(password, token)
            toast.success("Password updated successfully. redirecting to login page")
            setTimeout(() => {
                navigate("/login")
            }, 2000)
        }catch(err){
            console.log(err)
        }
    }

  return (
    <div className='w-screen h-screen flex  items-center justify-center'>
        <div className='flex flex-col items-center justify-center lg:justify-normal md:w-[450px] md:h-[400px] md:rounded-xl w-full h-full bg-neutral-900'>
            <div className='text-white flex flex-col mt-10 md:rounded-xl items-center w-full h-20 mb-5'>
                <p className='text-center'>Set New Password</p>
                <p className='text-center'>We would recommend not to use common password</p>
                <p className='text-center'>for your own safety</p>
            </div>

            <hr className='text-neutral-400 w-[90%] mb-5'/>
            <div className='w-full px-7'>
                <form onSubmit={handleSubmit}>
               <div>
                <label className='text-white ml-2'>New Password</label>
               <Input value={password} onChange={(e) => setPassword(e.target.value)}  isPassword={true} icon={FaLock} name="Password" required placeholder="New Password" type="password" />
               </div>

                <div className={`${error || message ? "mb-3" : "mb-6"}`}>
                <label className='text-white ml-2'>Confirm Password</label>
                <Input value={repeatedPass} onChange={(e) => setRepeatedPass(e.target.value)}  isPassword={true} icon={FaLock} name="Password" required placeholder="Repeat New Password" type="password" />
                </div>

                {error && <p className='text-red-500 '>{error}</p>}
                {message && <p className='text-emerald-500 '>{message}</p>}

                {isLoading ? <Button label={<AiOutlineLoading3Quarters className='animate-spin mx-auto' />}></Button> : <Button label={"Submit Changes"}></Button>}
                </form>
            </div>
        </div>
    </div>
  )
}

export default ResetPassword