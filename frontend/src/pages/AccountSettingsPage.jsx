import React, { useState } from 'react'
import { useAuthStore } from '../stateManagment/authStore'
import { useProfileStore } from '../stateManagment/profileStore';
import toast from 'react-hot-toast';
import { AiOutlineLoading3Quarters } from "react-icons/ai";

const SettingsThing = ({editName, user, fieldKey,ChangeWhat,setEditName, handleForm, setName, isLoading, type}) => {
    return(
        <div className="flex flex-col sm:flex-row sm:items-center gap-3">
        {!editName ? (
            <div className="flex flex-col sm:flex-row sm:items-center gap-2">
                <p>{type}:</p>
                <p className="break-all">{user?.[fieldKey] || "************"}</p>
                <button
                    className="w-full sm:w-20 h-8 sm:ml-4 text-black bg-white rounded-sm cursor-pointer mt-2 sm:mt-0"
                    onClick={() => setEditName(true)}
                >
                    Change
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
                    className="flex-1 min-w-0 p-2 h-8 border border-white rounded-sm text-white"
                />
                <button
                    type="submit"
                    className="w-full sm:w-20 h-8 bg-white text-black rounded-sm cursor-pointer flex items-center justify-center"
                >
                    {isLoading ? (
                        <AiOutlineLoading3Quarters className="animate-spin" />
                    ) : (
                        "Save"
                    )}
                </button>
            </form>
        )}
        </div>
    )
}

const AccountSettingsPage = ({ open }) => {
    const { user, updateName, isLoading } = useAuthStore();
    const { defaultPic } = useProfileStore();

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
        if (name.trim().length >= 20) {
            return toast.error('Name is too long');
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

    const handleFileChange = (e) => {
        const file = e.target.files[0]; 
        if (file) {
            const reader = new FileReader();
            reader.onloadend = () => {
                
            }
            reader.readAsDataURL(file); 
        }
    }

    return (
        <div className={`${!open ? "-mt-9" : "mt-0"} p-4 w-screen h-screen bg-[#212121] z-0`}>
            <div
                className={`${open ? "md:ml-72" : "ml-14"} flex flex-col transition-all text-white ease-in-out duration-100 h-screen items-center md:items-start`}
            >
                {/* Profile Picture */}
                <div className="flex justify-center md:justify-start mt-5">
                    <img
                        src={defaultPic}
                        className="w-20 h-20 md:w-32 md:h-32 rounded-full hover:bg-black hover:opacity-60 cursor-pointer object-cover"
                        alt="Profile"
                    />
                </div>

                {/* Name & Edit Section */}
                <div className="flex flex-col justify-center gap-5 mt-5 w-full max-w-xs md:max-w-sm">
                    <SettingsThing type={"Name"} fieldKey={"name"} ChangeWhat={name} editName={editName} setEditName={setEditName} user={user} handleForm={handleForm}  isLoading={isLoading} setName={setName}/>

                    {/* Email Section */}
                    <div className="text-white break-all flex flex-row gap-3">
                        <p>Email: </p>
                        <p>{user?.email}</p>
                    </div>

                    <div>
                        {
                            editPass ? <h1 className=''>Rasaltebs biwo tipi</h1> : <SettingsThing type={"Password"} fieldKey={"password"} ChangeWhat={password} editName={editPass} setEditName={setEditPass} user={user} setName={setPassword} />
                        }
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AccountSettingsPage;
