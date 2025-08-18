import React, { useEffect } from "react";
import { useAdminStore } from "../stateManagment/adminStore";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { NavLink } from "react-router-dom";
import AdminPageSkeletons from "../components/AdminPageSkeletons";
import { MdVerified } from "react-icons/md";

const AdminPage = ({ open }) => {
  const { getAllUsers, users, isLoading, pagination } = useAdminStore();

  useEffect(() => {
    getAllUsers(1, 10);
  }, [getAllUsers]);

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
              <h2 className="text-lg font-semibold mb-4 text-white">All Users</h2>

              <div className="space-y-2">
                {users.map((item) => (
                  <div
                    key={item._id}
                    className="p-3 bg-neutral-900 flex flex-col justify-center md:justify-normal md:flex-row items-center gap-2 rounded-md text-sm"
                  >
                    <NavLink to={`/account/${item?._id}`}><img src={item.image} className="w-8 cursor-pointer h-8 rounded-full" /></NavLink>
                    <NavLink to={`/account/${item?._id}`}><div className="hover:underline flex flex-row gap-1 items-center text-white cursor-pointer">{item.name} {item?.isAdmin || item.hasBadge ? <MdVerified className="text-sky-400" /> : <></>} <span className="text-gray-400">({item.email})</span></div></NavLink>
                  </div>
                ))}
              </div>

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
