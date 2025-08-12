import React, { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Button from '../components/Button'
import { useAuthStore } from '../stateManagment/authStore'
import toast from 'react-hot-toast'

const VerifyEmail = () => {

    const[code, setCode] = useState(["" , "", "", "", "", ""])
    const inputRefs = useRef([])
    const navigate = useNavigate()

    const {error, verifyEmail} = useAuthStore();

    const handleChange = (index, value) => {
        const newCode = [...code]

        if(value.length > 1){
            const postedCode = value.slice(0, 6).split("");
            for(let i = 0 ; i < 6; i++){
                newCode[i] =postedCode[i] || "";
            }
            setCode(newCode)

            //now focus on last empty input index
            const lastFilledIndex = newCode.findLastIndex((digit) => digit !== "");
            const focusIndex = lastFilledIndex < 5 ? lastFilledIndex + 1 : 5;
            inputRefs.current[focusIndex].focus();
        }
        else{
            newCode[index] = value;
            setCode(newCode);

            if(value && index < 5){
                inputRefs.current[index + 1].focus();
            }
        }
    }

    const handleKeyDown = (index, e) => {
        if(e.key === "Backspace" && !code[index] && index > 0){
            inputRefs.current[index - 1].focus()
        }
    }

    const handleSubmit = async(e) => {
        e.preventDefault()
        const verificationCode = code.join("");

        try {
            await verifyEmail(verificationCode)
            navigate("/")
            toast.success("Email verified successfully")
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if(code.every(digit => digit !== "")){
            handleSubmit(new Event('submit'))
        }
    }, [code])

  return (
    <div className='w-full bg-transparent h-[100vh] flex items-center justify-center backdrop-blur-xl rounded-2xl shadow-xl overflow-hidden'>
        <div className='bg-neutral-900 rounded-2xl shadow-2xl p-8 w-full max-w-md'>
        <h2 className='text-3xl font-bold mb-6 text-center bg-gradient-to-r from-teal-300 to-teal-500 text-transparent bg-clip-text'>Verify Your Email</h2>
        <p className='text-center text-gray-300 mb-6'>Enter 6 digit code sent to your email address</p>
        <form className='space-y-6' onSubmit={handleSubmit}>
            <div className='flex justify-between'>

                {
                    code.map((item, index) => {
                        return(
                            <input
                                key={index}
                                ref={(el) => (inputRefs.current[index] = el)}
                                type='text'
                                maxLength={'6'}
                                value={item}
                                onChange={(e) => handleChange(index, e.target.value)}
                                onKeyDown={(e) => handleKeyDown(index, e)}
                                className='w-12 h-12 text-center text-2xl font-bold  bg-neutral-800 text-white border-2 border-gray-500 rounded-lg focus:border-teal-400 focus:outline-none'
                            />
                        )
                    })
                }
            </div>
            {error && <p className='text-red-500 text-sm '>{error}</p>}
            <Button label={"Verify Email"} />
        </form>
        </div>
    </div>
  )
}

export default VerifyEmail