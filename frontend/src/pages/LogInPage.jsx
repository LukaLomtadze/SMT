import Input from "../components/Input";
import { IoPerson } from "react-icons/io5";
import { MdEmail } from "react-icons/md";
import { FaLock } from "react-icons/fa";
import Button from "../components/Button";
import { NavLink, useNavigate } from 'react-router-dom';
import { useAuthStore } from "../stateManagment/authStore";
import { useState } from "react";
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const LogInPage = () => {

    const {error, isLoading, login} = useAuthStore()
    const navigate = useNavigate()

    const[email, setEmail] = useState("")
    const[password, setPassword] = useState("");

    const handleSubmit = async(e) => {
        e.preventDefault()
        try {
            await login(password, email)
            navigate("/")
        } catch (error) {
            console.log(error)
        }
    }

  return (
    <div className='w-screen h-screen flex items-center justify-center '>
        <form className='text-white border-0 rounded-2xl' onSubmit={handleSubmit}>
            <div className='flex flex-col items-center  md:justify-between justify-around  pt-3 w-screen h-screen md:w-96 rounded-2xl md:h-[420px] bg-neutral-900'>
                <div className='flex flex-col gap-3 mt-32 md:mt-3 w-80'>
                    <h1 className='text-2xl text-center'>Welcome Back</h1>
                    <hr className=' text-neutral-600' />

                    <div className='mt-5 flex flex-col'>
                       <div>
                        <label htmlFor='email' className='text-[13px]'>Email</label>
                        <Input value={email} onChange={(e) => setEmail(e.target.value)} icon={MdEmail} name="email" required placeholder="You@example.com" type="text" />
                       </div>

                       <div>
                        <label htmlFor='Password' className='text-[13px]'>Password</label>
                        <Input value={password} onChange={(e) => setPassword(e.target.value)}  isPassword={true} icon={FaLock} name="Password" required placeholder="Password" type="password" />
                       </div>
                    </div>
                    {error && <p className="text-sm text-red-500 absolute bottom-[330px] md:bottom-[300px]">{error}</p>}
                    {isLoading ? <Button label={<AiOutlineLoading3Quarters className="animate-spin mx-auto" />}></Button> : <Button label="Log In" className="mt-3"/>}
                    <NavLink to={"/forgot-password"} className={"hover:underline text-center hover:text-blue-300 text-neutral-400"}>Forgot password?</NavLink>
                </div>
                <div className='flex items-center justify-center mt-[200px] md:mt-0 bg-neutral-800 p-3 rounded-br-2xl rounded-bl-2xl w-full'>
                    <p className='text-[14px] text-white'>Don't have an account? </p>
                    <NavLink to={"/signup"} className={"hover:underline hover:text-blue-300 text-neutral-400 "}>Sign Up</NavLink>
                </div>
            </div>
        </form>
    </div>
  )
}

export default LogInPage