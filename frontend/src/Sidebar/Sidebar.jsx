import React, { useEffect, useRef, useState } from "react";
import { TbLayoutSidebar } from "react-icons/tb";
import { MdTerminal } from "react-icons/md";
import { AiFillGitlab } from "react-icons/ai";
import { IoBookOutline } from "react-icons/io5";
import { LuSettings2 } from "react-icons/lu";
import { IoIosArrowForward } from "react-icons/io";
import { IoLogoBuffer } from "react-icons/io";
import SideBarHelper from "./SidebarHelper";
import Footer from "./Footer";
import { SidebarItems } from "./SidebarConfig";
import { NavLink } from "react-router-dom";

const Sidebar = ({open, setOpen}) => {

  const [rotatedIndex, setRotatedIndex] = useState(new Set());



  const helper = (index) => {
    if (!open) return;

    setRotatedIndex((prev) => {
      const newSet = new Set(prev);
      if (newSet.has(index)) {
        newSet.delete(index);
      } else {
        newSet.add(index);
      }
      return newSet;
    });
  };

  const sidebarRef = useRef(null)

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (window.innerWidth < 768 && open && sidebarRef.current && !sidebarRef.current.contains(event.target)) {
        setOpen(false);
      }
    };
  
    document.addEventListener("mousedown", handleClickOutside);
  
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [setOpen, open]);

  return (
    <div className="flex">
      {/* Sidebar */}
      <div
        className={`${
          open ? "w-[260px] p-5 gap-[40px]" : "w-[50px]"
        } fixed top-0 left-0 z-50 transition-all justify-between ease-in-out flex flex-col h-screen text-white text-[20px] gap-5 p-2 bg-[#171717] pt-5`}
        ref={sidebarRef}
      >
        {/* Top Header */}
        <div className={`flex flex-col gap-10`}>
        <div className="flex flex-row items-center gap-3 transition-all ease-in-out duration-300 ">
          <div
            className={`${
              open ? "w-[30px] ml-1 h-[30px] hover:bg-sky-500 bg-sky-400" : "bg-transparent ml-3"
            } transition-all ease-in-out duration-100 flex items-center justify-center rounded-[10px] cursor-pointer`}
          >
            {open ? (
              <NavLink to={"/"}><AiFillGitlab className="text-[25px]" /></NavLink>
            ) : (
              <TbLayoutSidebar
                className="cursor-pointer text-[25px] -ml-2"
                onClick={() => setOpen(true)}
              />
            )}
          </div>
          <span className="text-[18px]">{open ? "SideBar.jsx" : ""}</span>
        </div>

        {/* Sidebar Items */}
        <div className={`flex flex-col gap-3 h-[60vh] md:h-[70vh] scrollbar-dark overflow-auto ${open ? "mt-5" : ""}`}>
          <span className={`${open ? "text-[14px] text-gray-400" : "hidden"}`}>
            Platform
          </span>
          {SidebarItems.map((item, i) => (
            <div key={i} className="flex flex-col justify-between gap-2">
              <div
                className={`${
                  open
                    ? "hover:bg-[#262626] rounded-[8px] duration-100 cursor-pointer transition-all ease-in-out px-1"
                    : ""
                } flex flex-row items-center justify-between`}
                onClick={() => helper(i)}
              >
                <div
                  className={`${
                    open ? "flex-row" : "flex-col"
                  } flex items-center gap-2 w-[180px]`}
                >
                  <div className="w-[30px] h-[30px] text-[20px] hover:bg-[#262626] flex items-center justify-center rounded-[10px] cursor-pointer">
                    {item.icon}
                  </div>
                  <span className={`${open ? "text-[12px]" : "hidden"}`}>
                    {item.label}
                  </span>
                </div>
                <div
                  className={`${
                    open ? "cursor-pointer" : "hidden"
                  } ${rotatedIndex.has(i) ? "rotate-90" : "-rotate-0"} transition-all ease-in-out duration-75`}
                >
                  <IoIosArrowForward />
                </div>
              </div>

              {rotatedIndex.has(i) && (
                <div className={open ? "" : "hidden"}>
                  <SideBarHelper insideItems={item.rotateItems} />
                </div>
              )}
            </div>
          ))}
        </div>
        </div>
        <div>
            <Footer visible={open} />
        </div>
      </div>
      <TbLayoutSidebar
        onClick={() => setOpen(false)}
        className={`${
          open ? "fixed duration-300 left-[215px]  mt-6 z-100 translate-x-0 transition-all ease-in-out text-white cursor-pointer text-[25px]" : "mt-5 opacity-0 -translate-x-[40px]"
        }`}
      />
    </div>
  );
};

export default Sidebar;