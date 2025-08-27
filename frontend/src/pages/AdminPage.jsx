import React, { useEffect } from "react";
import { useAdminStore } from "../stateManagment/adminStore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import AdminPageSkeletons from "../components/AdminPageSkeletons";
import { MdVerified } from "react-icons/md";
import { FaBan } from "react-icons/fa6";
import { RiAdminFill } from "react-icons/ri";
import { useState } from "react";
import toast from "react-hot-toast";
import { IoArrowUndoCircleSharp } from "react-icons/io5";


const DoubleCheck = ({setIsBanCheck, handleConfirm, selectedEmail, selectedImage, selectedName, message, message2, buttonMessage}) => {
  return(
    <div
     className="w-screen z-[106] h-screen absolute top-0 flex items-center justify-center left-0 ">
      <div
      onClick={() => setIsBanCheck(false)}
       className="absolute top-0 left-0 bg-black h-full w-full opacity-60"></div>
      <div className="md:w-[50vw] w-[90%] z-[107] h-[60vh] bg-neutral-800 rounded-2xl justify-between flex flex-col">
        <div className="w-full flex justify-center text-center items-center py-5 px-5 text-white flex-col">
          <p className="break-all text-2xl">Are you sure?</p>
          <p className="break-words text-neutral-400 mt-10">{message}</p>
        </div>
        <div className="flex w-full items-center justify-center text-white flex-col">
          <p>{message2}</p>
          <div className="flex flex-row gap-2 text-neutral-400">
            <img src={selectedImage} className="w-6 h-6 rounded-full" />
            <p>{selectedName}</p>
            <p>({selectedEmail})</p>
          </div>
        </div>
        <div className="w-full h-[30%] flex flex-col md:flex-row justify-center gap-5 items-center">
          <button className="md:w-[20%] w-[80%] text-black hover:bg-neutral-300 rounded-lg px-5 py-2 cursor-pointer bg-white" onClick={() => setIsBanCheck(false)}>Cancel</button>
          <button className="md:w-[20%] w-[80%] hover:bg-red-600 text-white rounded-lg px-5 py-2 cursor-pointer bg-blue-500"
          onClick={() => {handleConfirm(); setIsBanCheck(false)}}

          >{buttonMessage}</button>
        </div>
      </div>
    </div>
  )
}

const AdminPage = ({ open }) => {
  const { getAllUsers, users, isLoading, pagination, deleteUser, makeUserAdmin, makeUserBadged} = useAdminStore();

  const[selectedUserId, setSelectedUserId] = useState(null)
  const[selectedName, setSelectedName] = useState("")
  const[selectedEmail, setSelectedEmail] = useState("")
  const[selectedImage, setSelectedImage] = useState("")

  useEffect(() => {
    getAllUsers(1, 10);
  }, [getAllUsers]);

  const [isBanCheck, setIsBanCheck] = useState(false)
  const [isAdminCheck, setIsAdminCheck] = useState(false)
  const [isBadgeCheck, setIsBadgeCheck] = useState(false)

  const handleDeleteUser = async (id) => {
    try{
      await deleteUser(id)
      return toast.success("User deleted succesfully")
    }catch(error){
      return toast.error(error)
    }
  }

  const handleUserAdmin = async (id) => {
    try{
      await makeUserAdmin(id)
      return toast.success("Status updated")
    }catch(error){
      return toast.error(error)
    }
  }

  const handleUserBadge = async(id) => {
    try{
      await makeUserBadged(id)
      return toast.success("Status updated")
    }
    catch(error){
      return toast.error(error)
    }
  }

  return (
    <div className={`${!open ? "-mt-14" : "-mt-5"} p-5 w-screen h-screen z-0`}>
      <div
        className={`${
          open ? "ml-80 w-[64vw]" : "sm:ml-30 ml-8 w-[80vw]"
        } h-screen transition-all ease-in-out duration-100`}
      >
        <div className="bg-neutral-800 border-x border-neutral-400 w-full h-full p-5 overflow-y-auto">
          {isLoading ? (
            <AdminPageSkeletons />
            
          ) : (
            <>
              <h2 className="text-lg font-semibold mb-4 text-white ml-4">All Users</h2>

              <div className="space-y-2">
                {users.map((item) => (
                  <div
                    key={item._id}
                    className="p-3 bg-neutral-900 flex flex-col justify-between w-full md:justify-between md:flex-row items-center gap-2 rounded-md text-sm"
                  >
                    <div className="flex flex-row items-center gap-3">
                    <NavLink to={`/account/${item?._id}`}>
                      <img src={item.image} className="w-8 cursor-pointer h-8 rounded-full" />
                    </NavLink>

                    <NavLink to={`/account/${item?._id}`}>
                      <div className="hover:underline flex flex-row gap-1 items-center text-white cursor-pointer">{item.name} {item?.isAdmin || item.hasBadge ? 
                        <MdVerified className="text-sky-400" /> : <></>} 
                        <span className="text-gray-400">({item.email})</span>
                      </div>
                    </NavLink>
                    </div>

                    <div className="flex flex-row gap-3">
                      <button className={`${item?.isAdmin ? "bg-gray-500 cursor-not-allowed" : "bg-red-500 cursor-pointer"} text-white p-2 rounded-lg`}
                        disabled={item?.isAdmin}
                        onClick={() => { 
                          setSelectedUserId(item?._id);
                          setIsBanCheck(true);
                          setSelectedName(item?.name);
                          setSelectedEmail(item?.email);
                          setSelectedImage(item?.image);
                          }} 
                      ><FaBan
                      />
                      </button>
                      <button className={`text-white ${item?.isAdmin ? "bg-neutral-600 cursor-not-allowed" : "cursor-pointer"} p-2 ${item?.hasBadge ? "bg-neutral-400 " : "bg-blue-500 "} rounded-lg`}
                        disabled={item?.isAdmin}
                        onClick={() => { 
                          setSelectedUserId(item?._id);
                          setIsBadgeCheck(true);
                          setSelectedName(item?.name);
                          setSelectedEmail(item?.email);
                          setSelectedImage(item?.image);
                        }} 
                      >
                        <MdVerified />
                      </button>
                      <button className={`text-white p-2 cursor-pointer ${item?.isAdmin ? "bg-amber-500" : "bg-lime-400"} rounded-lg`}
                      onClick={() => { 
                        setSelectedUserId(item?._id);
                        setIsAdminCheck(true);
                        setSelectedName(item?.name);
                        setSelectedEmail(item?.email);
                        setSelectedImage(item?.image);
                        }}
                      >{
                        item?.isAdmin ? <IoArrowUndoCircleSharp /> : <RiAdminFill />
                      }</button>
                    </div>
                  </div>
                ))}
              </div>

              {isBanCheck && <DoubleCheck 
              handleConfirm={() => handleDeleteUser(selectedUserId)}
              selectedName={selectedName}
              selectedEmail={selectedEmail}
              selectedImage={selectedImage}
              setIsBanCheck={setIsBanCheck}
              message={"Keep in mind that if you ban this user you can't reverse this conclusion and user will be gone forever"}
              message2={"Is this the user you are banning?"}
              buttonMessage={"Confirm"}
              />}
              {isAdminCheck && <DoubleCheck 
              handleConfirm={() => handleUserAdmin(selectedUserId)}
              selectedName={selectedName}
              selectedEmail={selectedEmail}
              selectedImage={selectedImage}
              setIsBanCheck={setIsAdminCheck}
              message={"Keep in mind that if you change this user's status they will lose/gain additional perks"}
              message2={"Are you changing status of this user?"}
              buttonMessage={"Confirm"}
              />}
              {isBadgeCheck && <DoubleCheck 
              handleConfirm={() => handleUserBadge(selectedUserId)}
              selectedName={selectedName}
              selectedEmail={selectedEmail}
              selectedImage={selectedImage}
              setIsBanCheck={setIsBadgeCheck}
              message={"Keep in mind that if you do this they will get/lose special verification badge"}
              message2={"Are you changing status of this user?"}
              buttonMessage={"Confirm"}
              />}

              {pagination.totalPages > 1 && (
                <div className="flex gap-2 mt-6 flex-wrap">
                  {Array.from({ length: pagination.totalPages }, (_, i) => (
                    <button
                      key={i + 1}
                      onClick={() => getAllUsers(i + 1, pagination.pageSize)}
                      className={`px-3 py-1 rounded-md transition cursor-pointer border border-neutral-600 ${
                        pagination.currentPage === i + 1
                          ? "bg-neutral-500 text-white"
                          : "bg-neutral-900 text-white hover:bg-neutral-600"
                      }`}
                    >
                      {i + 1}
                    </button>
                  ))}
                </div>
              )}
            </>
          )}
        </div>
      </div>
    </div>
  );
};

export default AdminPage;
