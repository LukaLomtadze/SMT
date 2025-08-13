import React, { useState } from 'react'
import Input from '../components/Input'
import { MdEmail } from 'react-icons/md'
import Button from '../components/Button'
import { useAuthStore } from '../stateManagment/authStore'
import { AiOutlineLoading3Quarters } from 'react-icons/ai'

const ForgotPassword = () => {

  const [email, setEmail] = useState("")

  const {isLoading, forgotPassword, error} = useAuthStore();

  const [isSubmited, setIsSubmited] = useState(false);

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      await forgotPassword(email)
      setIsSubmited(true)
    } catch (error) {
      console.log(error)
    }
  }

  return (
    <>
    {
      !isSubmited ? (
        <div className='flex flex-row w-screen h-screen md:p-5 p-0 items-center justify-center'>
      <div className='flex items-center flex-col h-80 w-[450px] bg-neutral-900 rounded-none md:rounded-xl'>
        <div className='flex flex-row w-full mt-5 px-7 items-center justify-center text-white flex-wrap text-wrap h-20'>
          <h1 className='text-center text-2xl mb-3'>Forgot Password?</h1>
          <p className='text-center text-neutral-500'>After entering your email you will recieve reset password link</p>
        </div>
        
        <hr className='text-neutral-500 w-[90%] mt-7' />
       <form className='w-full px-7 mt-7' onSubmit={handleSubmit}>
        <label htmlFor='email' className='text-white ml-2'>Email</label>
        <Input value={email} onChange={(e) => setEmail(e.target.value)} isPassword={false} icon={MdEmail} name="email" required placeholder="You@example.com" type="text" />

        {error && <p className='text-red-500 absolute'>{error}</p>}
        <div className='w-full mt-9'>
          {isLoading ? <Button label={<AiOutlineLoading3Quarters className='animate-spin mx-auto' />}></Button> : <Button label="Send Reset Email" />}
        </div>
        </form>
      </div>
      </div>
      ) : (
        <div className='w-screen h-screen flex items-center justify-center'>
          <div className='flex flex-col gap-3 flex-wrap text-wrap w-[420px] text-white bg-neutral-900 h-72 md:h-60 items-center justify-center p-5 rounded-xl'>
            <p className='text-2xl text-center'>You will recieve a password</p>
            <p>reset link at the address: </p>
            <p>{email}</p>
            <div className='w-12 h-12 bg-white rounded-full flex items-center justify-center text-black text-2xl'>✓</div>
            <p className='text-neutral-400 text-center'>
            you can close this page if you want
            </p>
          </div>
        </div>
      )
      
    }
    </>
  )
}

export default ForgotPassword