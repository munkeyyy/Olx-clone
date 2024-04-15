import React, { useRef, useState } from "react";
import { Select, Space, Popover } from "antd";
import Logo from "../Logo";
import { IoChevronDownOutline, IoSearchSharp } from "react-icons/io5";
import { FaPlus } from "react-icons/fa";
const NavBar = () => {
  const [isRotating, setIsRotating] = useState(false);
  const [language, setLanguage] = useState("english");
  const handleSubmit = (e) => {
    e.preventDefault();
  };

  const handleLang = () => {
    setIsRotating(!isRotating);
  };

  return (
    <div className="flex bg-[#EEF1F3] border-b-4 border-white  py-3 px-4 shadow-md sticky top-0 w-full z-[99] items-center gap-4">
      <div className="logo">
        <Logo />
      </div>
      <div className="bg-white border-black border-2 py-2 px-6 lg:w-[20%] xl:w-[21%] rounded-sm">
        use current location
      </div>
      <div className="search lg:w-[50%] xl:w-full">
        <form action="" onSubmit={handleSubmit}>
          <div className="flex items-center">
            <input
              type="text"
              className="w-full bg-white border-black border-2 py-2.5 rounded-none px-3"
              placeholder="Find Cars, Mobile Phones and more..."
            />
            <button
              type="submit"
              className="bg-[#002E34] h-[48px] min-w-[48px] text-[1.79vw] rounded-r-sm py-2  px-2 text-white "
            >
              <IoSearchSharp />
            </button>
          </div>
        </form>
      </div>
      <button className="lang">
        <Popover
          placement="bottom"
          content={
            <div className="py-1 w-full px-4 font-sans text-[1.1vw] flex flex-col gap-4  uppercase text-[#002E34]">
              <div
                onClick={() => setLanguage("english")}
                className="cursor-pointer font-semibold flex items-center justify-between gap-6"
              >
                English{" "}
                {language === "english" && (
                  <span className="h-2 w-2 bg-green-300 rounded-full"></span>
                )}
              </div>
              <div
                onClick={() => setLanguage("हिंदी")}
                className="cursor-pointer font-bold flex items-center justify-between gap-6"
              >
                हिंदी{" "}
                {language === "हिंदी" && (
                  <span className="h-2 w-2 bg-green-300 rounded-full"></span>
                )}
              </div>
            </div>
          }
          trigger="click"
        >
          <div
            onClick={handleLang}
            className={`roboto text-[1vw] flex items-center gap-1 font-medium  uppercase text-[#002E34] text-left ${
              language === "हिंदी" && "font-bold text-right"
            }`}
          >
            {language}
            <div
              className={`font-medium uppercase text-[1.3vw] text-[#002E34] ${
                isRotating ? "rotate-180" : "rotate-0"
              } transition-[all.9s]`}
            >
              <IoChevronDownOutline />
            </div>
          </div>
        </Popover>
      </button>
      <div className="flex items-center gap-4 ml-2">
        <div className="login underline-offset-2 roboto text-[1vw] flex items-center gap-1 font-medium  uppercase text-[#002E34] underline">
          Login
        </div>
        <button className="relative roboto font-medium uppercase">
          <svg width="104" height="48" viewBox="0 0 1603 768" className="_20oLV">
            <g>
              <path
              fill="#fff"
                className="_32cGm _3Vwmt"
                d="M434.442 16.944h718.82c202.72 0 367.057 164.337 367.057 367.058s-164.337 367.057-367.057 367.057h-718.82c-202.721 0-367.058-164.337-367.058-367.058s164.337-367.058 367.058-367.058z"
              ></path>
              <path
                className="_32cGm _3XfCS"
                fill="#ffce32"
                d="M427.241 669.489c-80.917 0-158.59-25.926-218.705-73.004l-0.016-0.014c-69.113-54.119-108.754-131.557-108.754-212.474 0-41.070 9.776-80.712 29.081-117.797 25.058-48.139 64.933-89.278 115.333-118.966l-52.379-67.581c-64.73 38.122-115.955 90.98-148.159 152.845-24.842 47.745-37.441 98.726-37.441 151.499 0 104.027 50.962 203.61 139.799 273.175h0.016c77.312 60.535 177.193 93.887 281.22 93.887h299.699l25.138-40.783-25.138-40.783h-299.698z"
              ></path>
              <path
              fill="#23e5db"
                className="_32cGm _1DrSr"
                d="M1318.522 38.596v0c-45.72-14.369-93.752-21.658-142.762-21.658h-748.511c-84.346 0-165.764 21.683-235.441 62.713l3.118 51.726 49.245 15.865c54.16-31.895 117.452-48.739 183.073-48.739h748.511c38.159 0 75.52 5.657 111.029 16.829v0c44.91 14.111 86.594 37.205 120.526 66.792l66.163-57.68c-43.616-38.010-97.197-67.703-154.957-85.852z"
              ></path>
              <path
              fill="#3a77ff"
                className="_32cGm HKswn"
                d="M1473.479 124.453l-55.855 9.91-10.307 47.76c61.844 53.929 95.92 125.617 95.92 201.88 0 25.235-3.772 50.26-11.214 74.363-38.348 124.311-168.398 211.129-316.262 211.129h-448.812l25.121 40.783-25.121 40.783h448.812c190.107 0 357.303-111.638 406.613-271.498 9.572-31.009 14.423-63.162 14.423-95.559 0-98.044-43.805-190.216-123.317-259.551z"
              ></path>
            </g>
          </svg>
          <div className="flex absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%]  items-center gap-2">
            <span>
              <FaPlus />
            </span>
            <span>Sell</span>
          </div>
        </button>
      </div>
    </div>
  );
};

export default NavBar;
