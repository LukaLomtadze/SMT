import React, { useRef, useState, useEffect } from 'react';
import { useAuthStore } from '../stateManagment/authStore';
import { FaImage } from "react-icons/fa6";
import { MdEmojiEmotions, MdVerified } from "react-icons/md";
import "emoji-picker-element";
import { IoMdClose } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { usePostStore } from '../stateManagment/postStore';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';


const HomePage = ({ open }) => {
  const { user } = useAuthStore();
  const textareaRef = useRef(null);
  const pickerRef = useRef(null);
  const emojiRef = useRef(null)
  const [showPicker, setShowPicker] = useState(false);

  const FRONT_URL = "http://localhost:5173/account/"

  const {getPosts, isLoading, posts, createPost} = usePostStore()

  const API_URL = "http://localhost:4040/api/auth"

  useEffect(() => {
    getPosts()
  }, [getPosts])

  const addEmoji = (emoji) => {
    const textarea = textareaRef.current;
    const start = textarea.selectionStart;
    const end = textarea.selectionEnd;
    const text = textarea.value;
    textarea.value = text.slice(0, start) + emoji + text.slice(end);
    textarea.focus();
  };

  useEffect(() => {
    const picker = pickerRef.current;
    if (!picker) return;

    const handleEmojiSelect = (e) => addEmoji(e.detail.unicode);
    picker.addEventListener('emoji-click', handleEmojiSelect);

    return () => {
      picker.removeEventListener('emoji-click', handleEmojiSelect);
    };
  }, [showPicker]);

  const [image, setImage] = useState("")

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (!file) return;

    const reader = new FileReader();
    reader.onloadend = async () => {
        const base64Image = reader.result;
        setImage(base64Image);
    };
    reader.readAsDataURL(file);
};

  useEffect(() => {
    const handleClickOutSide = (e) => {
      if(pickerRef.current && !pickerRef.current.contains(e.target) && !emojiRef.current.contains(e.target)){
        setShowPicker(false)
      }
    }

    window.addEventListener("mousedown", handleClickOutSide)

    return () => {
      window.removeEventListener("mousedown", handleClickOutSide)
    }
  }, [showPicker])

  const calculateUploadDate = (date) => {
    const dateNow = Date.now()
    const diff = dateNow - new Date(date).getTime();

    const seconds = Math.floor(diff / 1000);
    const minutes = Math.floor(seconds / 60);
    const hours = Math.floor(minutes / 60);
    const days = Math.floor(hours / 24);

    if(seconds < 60) return `${seconds}s`
    if(minutes < 60) return `${minutes}m`
    if(hours < 24) return `${hours}h`
    return `${days}d`
  }



  return (
    <div className={`${!open ? "-mt-9" : "mt-0"} p-5 w-screen h-screen z-0`}>
      <div className={`${open ? "ml-72" : "ml-18 md:ml-72"} transition-all ease-in-out duration-100`}>
        <div className='flex flex-col justify-center w-[60vw]'>
          <div className='flex flex-row text-white justify-evenly items-center'>
            <div className='hover:bg-neutral-700 px-5 md:px-20 cursor-pointer text-sm md:text-lg py-2 min-w-[50px] flex items-center justify-center md:min-w-[100px] text-center whitespace-nowrap'>
              <p>For You</p>
            </div>
            <div className='hover:bg-neutral-700 md:px-20 cursor-not-allowed px-5 text-sm md:text-lg py-2 min-w-[50px] flex items-center justify-center md:min-w-[100px] text-center whitespace-nowrap'>
              <p>Following</p>
            </div>
          </div>
          
          
          <div className={`flex md:flex-row md:mt-3 mt-14 justify-center items-center ml-5 flex-col  gap-3`}>

            <NavLink to={`${FRONT_URL}${user?._id}`}><img src={user?.image} className='w-10 h-10 md:w-12 md:h-12 rounded-full object-cover cursor-pointer' /></NavLink>
            <div className='w-full flex flex-col relative'>
              <textarea
                ref={textareaRef}
                maxLength={300}
                placeholder='Whats on your mind?'
                className={`placeholder:text-neutral-400 border-t-1 pt-5 border-gray-300 h-20 mb-3 ${image == "" ? "mt-0" : "sm:mt-0"} w-[90%] outline-0 resize-none text-white`}
              />

                {image && (
                  <>
                    <img src={image} className='max-h-30 w-32 rounded-lg object-cover pointer-events-none' />

                    <button 
                      onClick={() => setImage("")} 
                      className='absolute top-25 z-[90] left-26 md:top-24 md:left-26 rounded-full cursor-pointer text-lg flex items-center justify-center bg-black w-5 h-5 text-white'>
                        <IoMdClose />
                      </button></>
                )}

              <div className={`${image ? "" : ""} flex flex-row items-center justify-between px-3`}>
                <div className='flex gap-5'>
                  <FaImage className='text-white cursor-pointer w-5 h-5' onClick={() => document.getElementById("inputt").click()}
                  />
                  <input type='file' id='inputt' className='hidden' onChange={handleFileChange} />
                  <MdEmojiEmotions className='text-white w-5 h-5 cursor-pointer' onClick={() => setShowPicker(!showPicker)} ref={emojiRef} />
                </div>

                <button className='md:mr-20 mr-0 border-0 bg-white cursor-pointer hover:bg-neutral-300 rounded-2xl w-15'>Post</button>
              </div>

              {showPicker && (
                <div className={`${image ? "top-80" : "top-30"} absolute bg-neutral-800 rounded-lg p-2 z-50`}>
                  <emoji-picker
                    ref={pickerRef}
                    style={{ backgroundColor: "#1f1f1f", color: "white" }}
                  ></emoji-picker>
                </div>
              )}

              <div className='w-[90%] h-[1px] mt-3 bg-neutral-300'></div>
            </div>
          </div>

          <div>
            {
              isLoading ? <><AiOutlineLoading3Quarters className='animate-spin text-4xl absolute top-[50%] left-[50%] mx-auto text-sky-400' /></>
              :
              posts.map((item, i) => {
                return(
                  <div key={i} className={`p-5 border-1 ${i == 0 ? "mt-15" : ""}  text-white border-neutral-500`}>
                    <div className='flex md:gap-2 flex-row items'>
                      <NavLink to={`${FRONT_URL}${item.author._id}`} className={"w-8 h-8 md:w-12 md:h-12"}>
                        <img 
                          src={item.author.image} 
                          className='w-8 h-8 md:w-12 md:h-12 rounded-full'/>
                      </NavLink>

                      <NavLink to={`${FRONT_URL}${item.author._id}`}>
                          <p 
                            className='flex gap hover:underline cursor-pointer text-[12px] md:text-[16px] flex-row items-center'>
                            {item.author.name}
                            <MdVerified  className='text-sky-400' />
                          </p>
                          <div className='flex md:hidden text-[10px] text-gray-500'>{calculateUploadDate(item.createdAt)}</div>
                      </NavLink>
                      <div className='hidden md:inline text-[14px] text-gray-500'>{calculateUploadDate(item.createdAt)}</div>
                    </div>
                    <div className=''>
                    <div className=' mx-0 mt-5 md:mt-5 w-full'>
                      <p className='break-all'>{item.content}</p>
                    </div>
                    <div className='flex w-full md:mt-8 mt-3'>
                      {item.images.map((img, i) => {
                        return(
                          <img key={i} src={img} className='w-full border-2 border-neutral-400 shadow-green-500 shadow-2xl h-auto object-cover rounded-lg' />
                        )
                      })}
                    </div>
                    </div>
                  </div>
                )
              })
            }
          </div>
        </div>
      </div>
    </div>
  );
};

export default HomePage;

