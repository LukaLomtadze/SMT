import React, { useState } from 'react'
import { useAuthStore } from '../stateManagment/authStore'
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { MdEditSquare } from "react-icons/md";
import { VscPassFilled } from "react-icons/vsc";
import { IoMdCloseCircle } from "react-icons/io";
import Input from '../components/Input';
import { FaLock } from 'react-icons/fa';
import Skeleton from '../components/Skeleton';
import { ImSpinner9 } from "react-icons/im";
import { PiSpinnerBallFill } from "react-icons/pi";
import { PiSpinnerBold } from "react-icons/pi";


const SettingsThing = ({editName, user, fieldKey,ChangeWhat,setEditName, handleForm, setName, isLoading, type}) => {

    const handleKeyDown = (e) => {
        if(e.key === ' '){
            e.preventDefault()
        }
    }

    return(
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {!editName ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <p>{type}:</p>
                <p className="break-all">{user?.[fieldKey] || "************"}</p>
                <button
                    className="w-full sm:w-6 h-6 sm:ml-4 flex items-center justify-center text-black bg-white rounded-sm cursor-pointer mt-2 sm:mt-0"
                    onClick={() => setEditName(true)}
                >
                    <MdEditSquare />
                </button>
            </div>
        ) : (
            <form
                className="flex flex-col sm:flex-row sm:items-center gap-2 w-full"
                onSubmit={handleForm}
            >
                <p>{type}:</p>
                <input
                    value={ChangeWhat}
                    onChange={(e) => setName(e.target.value)}
                    placeholder={user?.[fieldKey] || "PassWord"}
                    onKeyDown={handleKeyDown}
                    maxLength={20}
                    disabled={isLoading}
                    className="flex-1 min-w-0 p-2 h-8 border border-white rounded-sm text-white"
                />
                <button
                    type="submit"
                    className="w-full sm:w-8 h-8 text-black bg-white rounded-sm cursor-pointer flex items-center justify-center"
                >
                    {isLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" />
                    ) : (
                        <div className='text-2xl'><VscPassFilled /></div>
                    )}
                </button>
                <button
                    onClick={() => setEditName(false)}
                    className={`${isLoading ? "bg-neutral-400 cursor-not-allowed" : "bg-white cursor-pointer"} w-full sm:w-8 h-8 text-black rounded-sm flex items-center justify-center`}
                    disabled={isLoading}
                >
                    {isLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" />
                    ) : (
                        <div className='text-2xl'><IoMdCloseCircle /></div>
                    )}
                </button>
            </form>
        )}
        </div>
    )
}


const PasswordUpdateForm = ({setEditPass, error ,password, setPassword, isLoading, updatePassword}) => {


    const [newPassowrd, setNewPassword] = useState("")
    const [repeatNewPassowrd, setRepeatNewPassword] = useState("")

    const handleForm = async (e) => {
        e.preventDefault()
        try {
            if(newPassowrd.trim().length === ""){
                return toast.error("Password can't be blank")
            }

            if(newPassowrd.length <= 4){
                return toast.error("Password is too short. Use something stronger")
            }
            if(newPassowrd !== repeatNewPassowrd){
                return toast.error("Please repeat new password correctly")
            }
            await updatePassword(password, newPassowrd)
            toast.success("Password changed succesfully")
            setPassword("")
            setEditPass(false)
        }catch{
            return toast.error(error || "Old password is incorrect")
        }
    }

    return(
        <>
            <div className='flex flex-row'>
                <form className='flex flex-col items-center' onSubmit={handleForm}>
                    <div>
                        <label htmlFor={"oldPassword"}>Old Password</label>
                        <Input placeholder={"Old password"} onChange={(e) => setPassword(e.target.value)} value={password} isPassword={true} icon={FaLock} name={"oldPassowrd"} />
                    </div>
                    <div>
                        <label htmlFor={"newPassword"}>New Password</label>
                        <Input placeholder={"New Password"} value={newPassowrd} onChange={(e) => setNewPassword(e.target.value)} isPassword={true} icon={FaLock} name={"newPassowrd"} />
                    </div>
                    <div>
                        <label htmlFor={"repeatPassword"}>Repeat New Password</label>
                        <Input placeholder={"Repeat New Password"} value={repeatNewPassowrd} onChange={(e) => setRepeatNewPassword(e.target.value)}  isPassword={true} icon={FaLock} name={"repeatPassowrd"} />
                    </div>
                    <div className='flex flex-col gap-3'>
                        <button type='submit' className='bg-white px-3 py-1 cursor-pointer text-black rounded-sm'>
                            {
                                isLoading ? <AiOutlineLoading3Quarters className='animate-spin mx-auto' /> : "Update"
                            }
                        </button>
                        <button 
                        onClick={() => setEditPass(false)} 
                        type='button' 
                        disabled={isLoading}
                        className={` px-3 py-1 text-black rounded-sm ${isLoading ? "bg-neutral-500 cursor-not-allowed" : "bg-white cursor-pointer"}`}>
                            {
                                isLoading ? 
                                <AiOutlineLoading3Quarters className='animate-spin mx-auto' />
                                    :
                                "Cancel"
                            }
                        </button>
                    </div>
                </form>
            </div>
        </>
    )
}


const AccountSettingsPage = ({ open }) => {
    const { user, updateName, isLoading, updateImage, error ,isLoadingImage, updatePassword } = useAuthStore();
    //const { defaultPic } = useProfileStore();

    const [name, setName] = useState(user?.name || "");
    const [editName, setEditName] = useState(false);

    const [password, setPassword] = useState("")
    const [editPass, setEditPass] = useState(false);

    const handleForm = async (e) => {
        e.preventDefault();
        if (name.trim() === "") {
            setEditName(false)
            return;
        }
        if(name.trim().length <= 2){
            return toast.error('Name is too short');
        }

        try {
            if(user?.name === name){
                setEditName(false)
                return;
            }
            await updateName(name);
            toast.success("Name changed successfully");
            setEditName(false);
        } catch (error) {
            console.log(error);
            return toast.error(user.error);
        }
    };

    const date1 = new Date(user?.createdAt)
    const formatDate1 = date1.toLocaleString("en-GB", {
        year: "numeric",
        day: "numeric",
        month: "numeric",
    })

    const date2 = new Date(user?.updatedAt)
    const formatDate2 = date2.toLocaleString("en-GB", {
        year: "numeric",
        day: "numeric",
        month: "numeric",
        hour: "2-digit",
        minute: "2-digit",
    })

    const [image, setImage] = useState(user?.image)

    const handleFileChange = (e) => {
        const file = e.target.files[0];
        if (!file) return;
    
        const reader = new FileReader();
        reader.onloadend = async () => {
            const base64Image = reader.result;
            setImage(base64Image);
            try {
                await updateImage(base64Image);
                toast.success("Image updated successfully");
            } catch (err) {
                toast.error("Error updating image");
                console.error(err);
            }
        };
        reader.readAsDataURL(file);
    };

    return (
        <div className={`${!open ? "-mt-9" : "mt-0"} p-4 w-screen h-screen bg-[#212121] z-0`}>
            <div
                className={`${open ? "md:ml-72" : "ml-14"} flex flex-col transition-all text-white ease-in-out duration-100 h-screen items-center md:items-start`}
            >
                
                <div className="flex justify-center md:justify-start mt-5">
                    {isLoadingImage ?
                     <Skeleton className={"w-20 h-20 z-10 flex flex-row items-center justify-center md:w-32 rounded-full md:h-32"}>
                        <PiSpinnerBallFill className='w-14 z-50 h-14 md:w-24 md:h-24  mx-auto animate-[spin_0.4s_linear_infinite] ' />
                     </Skeleton> : 
                     <><input
                        type='file' 
                        accept='image/*' 
                        id='profile-pic-upload' 
                        className='hidden'
                        onChange={handleFileChange}
                    />
                    <img
                        src={image}
                        onClick={() => document.getElementById("profile-pic-upload").click()}
                        className="w-20 h-20 md:w-32 md:h-32 rounded-full hover:bg-black hover:opacity-60 cursor-pointer object-cover"
                        alt="Profile"
                    />
                    </>
                    }
                </div>

                
                <div className="flex flex-col justify-center gap-5 mt-5 w-full max-w-xs md:max-w-sm">
                    <SettingsThing type={"Name"} fieldKey={"name"} ChangeWhat={name} editName={editName} setEditName={setEditName} user={user} handleForm={handleForm}  isLoading={isLoading} setName={setName}/>

                    
                    <div className="text-white break-all flex flex-row gap-3">
                        <p>Email: </p>
                        <p>{user?.email}</p>
                    </div>

                    <div>
                        {
                            editPass ? 
                            <PasswordUpdateForm editPass={editPass} setEditPass={setEditPass} password={password} setPassword={setPassword} isLoading={isLoading} updatePassword={updatePassword} error={error} /> 
                            : 
                            <SettingsThing type={"Password"} fieldKey={"password"} ChangeWhat={password} editName={editPass} setEditName={setEditPass} user={user} setName={setPassword} />
                        }
                    </div>
                    <div className='w-full h-[1px] bg-neutral-600'></div>
                        
                    <h1>Account Details:</h1>
                    <div className='flex flex-col gap-2 text-neutral-300'>
                        <p>Account Status: {!user?.isVerfied ? "Verified" : "Not Verified"}</p>
                        <p className=''>Account Id: {user?._id}</p>
                        <p className=''>Account Created at: {formatDate1}</p>
                        <p className=''>Account Updated at: {formatDate2.toUpperCase()}</p>
                    </div>

                    <div className='w-full h-[1px] bg-neutral-600'></div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettingsPage;
