import React from "react";
import { IoMdClose } from "react-icons/io";

const OpenedImage = ({ src, setOpenImage }) => {
    // useEffect(() => {
    //     const onKey = (e) => e.key === "Escape" && setOpenImage(false);
    //     window.addEventListener("keydown", onKey);
    //     return () => window.removeEventListener("keydown", onKey);
    //   }, [setOpenImage]);

  return (
    <div
      className="fixed inset-0 z-[100] bg-black/60 flex items-center justify-center"
      onClick={() => setOpenImage(false)}
      role="dialog"
      aria-modal="true"
    >
      <img
        src={src}
        className="z-[101] md:max-w-[70%] shadow-lg shadow-sky-600 md:w-[40%] w-[70%] h-auto rounded-2xl"
        onClick={(e) => e.stopPropagation()}
        alt=""
      />
      <button className="absolute top-5 right-5 cursor-pointer">
        <IoMdClose />
      </button>
    </div>
  );
};

export default OpenedImage;
