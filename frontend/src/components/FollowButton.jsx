import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { useAuthStore } from "../stateManagment/authStore";
import axios from "axios";

function FollowButton({ profileId, setProfileData }) {
    const { followUser, unFollowUser, user, isLoading } = useAuthStore();

    const isFollowing = user?.following?.includes(profileId);

    const handleClick = async () => {
        try {
            if (isFollowing) {
                await unFollowUser(profileId);
            } else {
                await followUser(profileId);
            }

            const res = await axios.get(`http://localhost:4040/api/auth/user/${profileId}`, { withCredentials: true });
            setProfileData(res.data);

        } catch (error) {
            console.log(error.response?.data?.message || "Error");
        }
    };

    return (
        <button onClick={handleClick}  className={`bg-white ${!isFollowing ? "active:bg-sky-400" : "active:bg-red-300"} text-neutral-900 md:w-full w-[95%] h-8 rounded-sm cursor-pointer  hover:bg-neutral-200 transition-all ease-in-out duration-75`}>
            {isLoading ? <AiOutlineLoading3Quarters className="animate-spin mx-auto" /> : <>{isFollowing ? "Unfollow" : "Follow"}</>}
        </button>
    );
}


export default FollowButton;