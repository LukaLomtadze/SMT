import React, { useState } from 'react'
import { useProfileRouterStore } from '../stateManagment/profileRouter'
import { HiMiniSquares2X2 } from "react-icons/hi2";
import { IoHeartDislike } from "react-icons/io5";
import { FaFrownOpen } from "react-icons/fa";
import { useParams } from 'react-router-dom';
import { useAuthStore } from '../stateManagment/authStore';
import { GoBookmarkSlash } from "react-icons/go";


const ResuableNocontent = ({icon:Icon, label, pg}) => {
    return(
        <div className={`${open ? "px-8" : ""} max-w-screen mt-20 flex flex-col h-full items-center justify-center text-center`}>
            <div className="w-20 h-20 sm:w-24 sm:h-24 md:w-26 md:h-26 rounded-full mb-3 bg-neutral-700 flex items-center justify-center">
                <Icon className="w-12 h-12 sm:w-16 sm:h-16 md:w-20 md:h-20 text-white" />
            </div>
            <h1 className="text-white text-lg sm:text-xl font-semibold">{label}</h1>
            <p className="text-neutral-300 text-sm sm:text-base">{pg}</p>
        </div>
    )
}

const ProfileStatePage = () => {

    const {initialState, updateProfileState} = useProfileRouterStore()

    const [posts, setPosts] = useState(null);
    const [liked, setLiked] = useState(null);
    const [reposts, setReposts] = useState(null);

    const {id: profileId} = useParams()
    const {user} = useAuthStore()
    const isOwner = user?._id === profileId;
  return (
    <div>
        {initialState === "posts" && (
            <>{
                posts === null ? <ResuableNocontent icon={HiMiniSquares2X2} label={"No Content"} pg={isOwner ? "You haven't published any posts yet" : "This user hasn't published any posts"} /> : "Posts"
            } </>
        )}
        {initialState === "liked" && (
            <>{
                liked === null ? <ResuableNocontent icon={IoHeartDislike} label={"No Liked Posts"} pg={isOwner? "You haven't liked any posts yet" : "This user hasn't liked any posts yet"} /> : "Liked"
            }</>
        )}
        {initialState === "marked" && (
            reposts === null ? <ResuableNocontent icon={GoBookmarkSlash} label={"No Bookmarked Posts"} pg={isOwner ? "You haven't bookmarked any posts yet" : "This user hasn't bookmarked any posts"} /> : "Bookmarks"
        )}
    </div>
  )
}

export default ProfileStatePage