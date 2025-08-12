import React, { useState } from 'react'
import Input from '../components/Input';
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Button from '../components/Button';
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from '../stateManagment/authStore';
import { AiOutlineLoading3Quarters } from "react-icons/ai";


const SignUpPage = () => {

    const [name, setName] = useState("")
    const [password, setPassword] = useState("")
    const [email, setEmail] = useState("")
    const navigate = useNavigate()
    const { signup, error, isLoading } = useAuthStore();


    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await signup(email, password, name);
            console.log("Finished")
            navigate("/verify-email");
        } catch (err) {
            console.error("Signup error:", err);
        }
    };
      
      
      
      
  return (
    <div className='w-screen h-screen flex items-center justify-center'>
        <form className='text-white' onSubmit={handleSubmit}>
            <div className='flex text-white flex-col items-center justify-between  pt-3 w-96 rounded-2xl h-[470px] bg-[#171717]'>
                <div className='flex flex-col gap-3 mt-3 w-80'>
                    <h1 className='text-2xl text-center'>Create an account</h1>
                    <hr className=' text-neutral-600' />

                    <div className='mt-5 flex flex-col'>
                        <div>
                            <label htmlFor='name' className='text-[13px]'>Name</label>
                            <Input value={name} onChange={(e) => setName(e.target.value)} isPassword={false} icon={IoPerson} name="name" required placeholder="Full Name" type="text" />
                        </div>

                       <div>
                        <label htmlFor='email' className='text-[13px]'>Email</label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} isPassword={false} icon={MdEmail} name="email" required placeholder="You@example.com" type="text" />
                       </div>

                       <div>
                        <label htmlFor='Password' className='text-[13px]'>Password</label>
                        <Input value={password} onChange={(e) => setPassword(e.target.value)} isPassword={true} icon={FaLock} name="Password" required placeholder="Password" type="password" />
                       </div>

                       {error &&  <p className='text-red-500 absolute bottom-62 text-[12px] font-semibold mt-2'>{error}</p>}
                    </div>

                    {isLoading ? <Button label={<AiOutlineLoading3Quarters className="animate-spin mx-auto" />}></Button> : <Button label="Create Account" />}
                </div>
                <div className='flex items-center justify-center bg-neutral-800 p-3 rounded-br-2xl rounded-bl-2xl w-full'>
                    <p className='text-[14px] text-white'>Already have an account? </p>
                    <NavLink to={"/login"} className={"hover:underline hover:text-blue-300 text-neutral-400 "}>Log In</NavLink>
                </div>
            </div>
        </form>
    </div>
  )
}

export default SignUpPage