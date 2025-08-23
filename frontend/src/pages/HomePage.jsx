import React, { useRef, useState, useEffect } from 'react';
import { useAuthStore } from '../stateManagment/authStore';
import { FaImage } from "react-icons/fa6";
import { MdEmojiEmotions, MdVerified } from "react-icons/md";
import "emoji-picker-element";
import { IoMdClose } from "react-icons/io";
import { NavLink } from 'react-router-dom';
import { usePostStore } from '../stateManagment/postStore';
import { AiOutlineLoading3Quarters } from 'react-icons/ai';
import ColorThief from 'colorthief';
import Skeleton from '../components/Skeleton';
import { GoComment } from "react-icons/go";
import { IoIosHeart } from "react-icons/io";
import { IoIosHeartEmpty } from "react-icons/io";
import { LiaRetweetSolid } from 'react-icons/lia';
import OpenedImage from './OpenedImage';
import BigSkeletons from '../components/BigSkeletons';
import DeleteButton from '../components/MenuButton';
import { HiDotsVertical } from "react-icons/hi";
import MenuButton from '../components/MenuButton';
import toast from 'react-hot-toast';
import DoubleCheck from '../components/DoubleCheck';
import { useCommentStore } from '../stateManagment/commentStore';
import Comments from '../components/Comments';
import { FaTrash } from "react-icons/fa6";
import { GoBookmarkFill } from "react-icons/go";
import { GoBookmark } from "react-icons/go";

const PostImage = ({src}) => {

  const imageRef = useRef(null)
  const [borderColor, setBorderColor] = useState("transparent");

  const [openImage, setOpenImage] = useState(false)

  useEffect(() => {
    const img = imageRef.current;
    if(!img) return;


    const handleLoad = () => {
      const colorThief = new ColorThief();
      try {
        const result = colorThief.getColor(img); 
        setBorderColor(`rgb(${result[0]}, ${result[1]}, ${result[2]})`);
      } catch (err) {
        console.error("ColorThief failed:", err);
      }
    };

    img.addEventListener("load", handleLoad);
    return () => img.removeEventListener("load", handleLoad);

  }, [src])


  return(
    <>
      <img 
      ref={imageRef} 
      src={src} 
      crossOrigin='anonymous'
      className={`md:w-[50%] w-full h-auto object-cover rounded-lg cursor-pointer`}
      onClick={() => setOpenImage(true)}
      style={{
        boxShadow: `0 25px 50px rgba(${borderColor.replace("rgb(", "").replace(")", "")}, 0.6)`
      }}
    />

    {openImage ? <OpenedImage src={src} setOpenImage={setOpenImage} openImage={openImage} /> : ""}
    </>
  )
}

const HomePage = ({ open }) => {
  const { user } = useAuthStore();
  const textareaRef = useRef(null);
  const pickerRef = useRef(null);
  const emojiRef = useRef(null)
  const [showPicker, setShowPicker] = useState(false);

  const imageRef = useRef(null)

  useEffect(() => {
    const img = imageRef.current;
    if(!img){
      return;
    }


  })

  const FRONT_URL = "http://localhost:5173/account/"

  const {getPosts, isLoading, posts, createPost, deletePost} = usePostStore()

  const [isLiked, setIsLiked] = useState({})
  const [isBookMarked, setIsBookMarked] = useState({})

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

  const handlePostUpload = async() => {
    const content = textareaRef.current.value.trim();
    if(!content && !image) return

    try{
      await createPost(content, image ? [image] : [])
      textareaRef.current.value = ""
      setImage("")
    }catch(err){
      console.log(err)
    }
  }

  const handleDelete = async (id) => {
    try{
      await deletePost(id)
      return toast.success("Post Deleted Succesfully")
    }catch(error){
      console.log(error)
    }
  }

  //const [isDeleteOption, setIsDeleteOption] = useState(false)

  const [postId, setPostId] = useState(null)


  const {isOpen, toggleOpen, getComments} = useCommentStore()

  return (
    <div className={`${!open ? "md:-mt-9" : "mt-0"} p-5 w-screen h-screen z-0`}>
      <div className={`${open ? "ml-80" : "sm:ml-30 ml-12 md:ml-72"} transition-all ease-in-out duration-100`}>
        <div className='flex flex-col justify-center w-[70vw] md:w-[60vw]'>
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

                <button
                  className='md:mr-20 mr-0 border-0 bg-white cursor-pointer hover:bg-neutral-300 rounded-2xl py-1 w-15'
                  onClick={handlePostUpload}  
                  type='submit'
                >
                  {isLoading ? <AiOutlineLoading3Quarters className='animate-spin mx-auto'/> : "Post"}
                </button>
              </div>

              {showPicker && (
                <div className={`${image ? "top-60" : "top-30"} absolute bg-neutral-800 rounded-lg p-2 z-50`}>
                  <emoji-picker
                    ref={pickerRef}
                    style={{ backgroundColor: "#1f1f1f", color: "white" }}
                  ></emoji-picker>
                </div>
              )}

              <div className='w-[90%] h-[1px] mt-3 bg-neutral-300'></div>
            </div>
          </div>

          <div className={`${isLoading ? "" : "flex w-full items-center flex-col"}`}>
            {
              isLoading ? <>
                <BigSkeletons />
              </>
              :
              posts.map((item, i) => {
                
                return(
                  <div key={i} className={`p-5 border-1 mb-10 ${i == 0 ? "mt-15" : ""} rounded-2xl ${i == posts.length - 1 ? "mb-10" : ""} w-[90%]  text-white border-neutral-500`}>
                    <div className='flex gap-2 flex-row justify-between'>
                      <div className='flex gap-2 flex-row items'>
                      <NavLink to={`${FRONT_URL}${item.author._id}`} className={"w-8 h-8 md:w-12 md:h-12"}>
                        <img 
                          src={item.author.image} 
                          className='w-8 h-8 md:w-12 md:h-12 rounded-full'
                          quality={100}
                          />
                      </NavLink>

                      <NavLink to={`${FRONT_URL}${item.author._id}`}>
                          <p 
                            className='flex gap hover:underline cursor-pointer text-[12px] md:text-[16px] flex-row items-center break-words'>
                            {item.author.name}
                            {item.author?.isAdmin || item.author?.hasBadge ? <MdVerified  className='text-sky-400' /> : <></>}
                          </p>
                          <div className='flex md:hidden text-[10px] text-gray-500'>{calculateUploadDate(item.createdAt)}</div>
                          
                      </NavLink>
                      {user?._id === item.author?._id ? 
                          <>
                            <button
                          onDoubleClick={() => handleDelete(item._id)}
                          className='bg-white md:hidden h-[80%] cursor-pointer rounded-sm text-black'>
                            <FaTrash />
                          </button>
                            
                          </>
                      :
                        <></>
                      }
                      <div className='hidden md:inline text-[14px] text-gray-500'>{calculateUploadDate(item.createdAt)}</div>
                      
                      </div>
                      {user?._id === item.author?._id || user?.isAdmin ? 
                          <>
                            <button 
                          
                          onClick={() => handleDelete(item._id)}
                          className='bg-white md:block hidden h-[50%] p-1 cursor-pointer rounded-sm text-black'>
                            <FaTrash />
                          </button>
                            
                          </>
                      :
                        <></>
                      }
                    </div>
                    <div className=''>
                    <div className=' mx-0 mt-5 md:mt-5 w-full'>
                      <p className='break-all'>{item.content}</p>
                    </div>
                      <div className='flex w-full justify-center md:mt-8 mt-3'>
                        {item.images.map((img) => {
                          return(
                            <PostImage key={i} src={img} />
                          )
                        })}
                      </div>
                      
                      <div className='w-full flex justify-center mt-3'>
                        
                        <div className='flex flex-row items-center justify-between  md:w-[40%] w-[80%]'>
                          <div onClick={() => {
                              toggleOpen(isOpen);
                              setPostId(item._id);
                              getComments(item._id)
                          }} className='cursor-pointer md:text-lg flex flex-row items-center justify-center hover:bg-sky-900 hover:text-blue-400 rounded-full p-1 text-sm'>
                            <GoComment />
                          </div>

                          <div className='cursor-pointer hover:bg-fuchsia-900 flex flex-row items-center justify-center  rounded-full p-1  md:text-lg text-sm hover:text-pink-400'
                            onClick={() => setIsLiked(prev => ({...prev, [item._id] : !prev[item._id]}))}
                          >
                            {!isLiked[item._id] ? (<IoIosHeartEmpty />) : (<IoIosHeart className='text-pink-500 shadow-2xl'/>)}
                          </div>

                          <div className='cursor-pointer hover:bg-amber-900 flex flex-row items-center justify-center hover:text-amber-400 rounded-full p-1  md:text-lg text-sm'
                            onClick={() => setIsBookMarked(prev => ({...prev, [item._id] : !prev[item._id]}))}
                          >
                            {isBookMarked[item._id] ? (<GoBookmarkFill className='text-amber-400' />) : (<GoBookmark />)}
                          </div>
                        </div>

                        <Comments postId={postId} />
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

