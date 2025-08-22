import React, { useState, useRef, useEffect } from "react";
import { FaSearch } from "react-icons/fa";
import { FaMessage } from "react-icons/fa6";
import { MdVerified } from "react-icons/md";
import { useAuthStore } from "../stateManagment/authStore";

const MessagingPage = ({ open }) => {
  const inputRef = useRef(null);

  const [image, setImage] = useState(
    "https://s3.eu-central-1.amazonaws.com/uploads.mangoweb.org/shared-prod/visegradfund.org/uploads/2021/08/placeholder-male.jpg"
  );
  const [name, setName] = useState("Name");

  const {user, followers, following, getFollowersAndFollowing} = useAuthStore()


  useEffect(() => {
    getFollowersAndFollowing(user?._id)
  }, [user?._id, getFollowersAndFollowing])

  return (
    <div
      className={`${!open ? "-mt-14" : "-mt-5"} p-2 sm:p-5 w-screen h-screen z-0`}
    >
      <div
        className={`${
          open ? "ml-0 md:ml-80 md:w-[64vw]" : "ml-10 md:ml-11 md:w-[80vw]"
        } h-screen transition-all ease-in-out duration-200`}
      >
        <div className="bg-neutral-800 border-x border-neutral-400 w-full h-full flex flex-col md:flex-row">
          <div className="w-full md:w-[30%] lg:w-[25%] flex flex-col bg-neutral-900 h-1/6 md:h-full">
            <div className="w-full flex items-center justify-center text-white py-3 sm:py-5 border-b border-neutral-500">
              <p className="text-base sm:text-xl md:text-2xl pt-5 md:pt-0 mb-2 flex items-center gap-1 sm:gap-2 cursor-pointer">
                <FaMessage className="text-sm sm:text-base md:text-lg" />
                Messages
              </p>
            </div>

            <div className="border-b border-neutral-500 p-2">
              <div className="flex items-center gap-2 border border-neutral-500 rounded-2xl px-2 sm:px-3 py-1 focus-within:border-neutral-50">
                <div
                  className="cursor-pointer"
                  onClick={() => inputRef.current.focus()}
                >
                  <FaSearch className="text-amber-100" />
                </div>
                <input
                  ref={inputRef}
                  className="flex-grow bg-transparent outline-none border-none text-neutral-300 text-sm sm:text-base md:text-lg placeholder:text-sm sm:placeholder:text-base"
                  placeholder="Search..."
                />
              </div>
            </div>

            <div>
              <div className="flex flex-row items-center px-5">
                <div className="w-[90%] flex flex-row items-center border-b border-neutral-500  text-white mt-3">
                  <p className="text-lg text-white self-start ml-7">Following</p>
                </div>
              </div>
              {following.map((item) => {
                return(
                  <div key={item?._id}>
                    <div className="flex flex-row items-center gap-1 text-white px-2 py-1 mx-3 cursor-pointer my-3 w-[90%] rounded-2xl hover:bg-neutral-600 transition-all ease-in-out duration-100">
                      <div className="flex flex-row gap-2 items-center">
                        <img src={item.image} className="w-8 h-8 rounded-full" />
                      </div>
                      <div>
                        <p className="flex flex-row gap-1 items-center ">
                          {item.name}{
                            item.isAdmin || item.hasBadge ? <MdVerified className="text-sky-400" /> : <></>
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                )
              })}
            </div>
            
          </div>

          <div className="w-full md:w-[70%] lg:w-[75%] bg-neutral-800 flex flex-col h-3/3 md:h-full">
            <div className="flex items-center gap-2 sm:gap-3 border-b border-neutral-500 p-3 sm:p-5">
              <img src={image} className="w-8 h-8 sm:w-10 sm:h-10 rounded-full" />
              <p className="text-white flex items-center gap-1 sm:gap-2 text-sm sm:text-base md:text-lg">
                {name}
                <MdVerified className="text-sky-400" />
              </p>
            </div>

            {/* Messages list */}
            <div className="flex-grow w-full h-[90%] px-3 sm:px-6 md:px-10 py-3 overflow-y-auto">
              <ul className="flex flex-col gap-2 text-white text-sm sm:text-base">
                <li className="self-start bg-neutral-700 px-3 py-2 rounded-2xl max-w-[70%]">
                  Your Message
                </li>
                <li className="self-end bg-sky-600 px-3 py-2 rounded-2xl max-w-[70%]">
                  My Message
                </li>
              </ul>
            </div>

            {/* Input field */}
            <div className="border-t border-neutral-500 p-3 sm:p-5 flex items-center gap-2">
              <input
                placeholder={`Send Message to ${name}`}
                className="flex-grow text-white p-2 sm:p-3 outline-none border border-neutral-600 rounded-3xl bg-neutral-900 text-sm sm:text-base"
              />
              <button className="px-4 py-2 sm:px-6 sm:py-2 bg-sky-600 rounded-full text-white text-sm sm:text-base">
                Send
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessagingPage;
