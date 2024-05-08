import React, { useContext, useEffect, useRef, useState } from "react";
import { Select, Space, Popover, Modal, notification, Drawer } from "antd";
import Logo from "../Logo";
import { FaPlus } from "react-icons/fa";
import SingnUp from "../SignUp/SingnUp";
import LogIn from "../LogIn/LogIn";
import { LoginContext } from "../../contexts/Login/LoginContext";
import UserProfile from "../UserProfile/UserProfile";
import { useNavigate } from "react-router-dom";
import axios from "axios";
import { SearchContext } from "../../contexts/Search/SearchContext";
import { RiChat1Line } from "react-icons/ri";

// import { baseUrl } from "../../utils";
import { MdOutlineMenu } from "react-icons/md";
const NavBar = () => {
  const [isRotating, setIsRotating] = useState(false);
  const { isLoggedIn } = useContext(LoginContext);
  const [language, setLanguage] = useState("english");
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isSignedUp, setIsSignedUp] = useState(true);
  const [address, setAddress] = useState([]);
  const [isClicked, setIsClicked] = useState(false);
  const [value, setValue] = useState("");
  const [open, setOpen] = useState(false);
  const showDrawer = () => {
    setOpen(true);
  };
  const onClose = () => {
    setOpen(false);
  };

  const showModal = () => {
    setIsModalOpen(true);
  };
  useEffect(() => {
    getLocation();
  }, []);

  // const handleSubmit = (e) => {
  //   e.preventDefault();
  // };
  const { getData, loading, setLoading } = useContext(SearchContext);
  useEffect(() => {
    getData();
  }, []);

  const handleLang = () => {
    setIsRotating(!isRotating);
  };

  const getLocation = () => {
    navigator.geolocation.getCurrentPosition((position) => {
      const latitude = position.coords.latitude;
      const longitude = position.coords.longitude;
      axios
        .get(
          `https://api.geoapify.com/v1/geocode/reverse?lat=${latitude}&lon=${longitude}&apiKey=0bf0c6bd9c1449378cdc80add17d4767`
        )
        // .then((response) => response.json())
        .then((result) => {
          // console.log(result.data.features[0].properties);
          setAddress([result.data.features[0].properties]);
          setLoading(false);
          localStorage.setItem(
            "location",
            JSON.stringify(result.data.features[0].properties)
          );
        })
        .catch((error) => console.log("error", error));
    });
  };
  const handleClick = () => {
    getLocation();
    setIsClicked(true);
  };

  const navigate = useNavigate();
  const changeHandler = (e) => {
    getData(e.target.value);
  };

  const googleTranslateElementInit = () => {
    new window.google.translate.TranslateElement(
      {
        pageLanguage: "en",
        includedLanguages: "en,hi", // include this for selected languages
        layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
      },
      "google_translate_element"
    );
  };

  useEffect(() => {
    var addScript = document.createElement("script");
    addScript.setAttribute(
      "src",
      "//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
    );
    document.body.appendChild(addScript);
    window.googleTranslateElementInit = googleTranslateElementInit;
  }, []);

  return (
    <div className="flex flex-col  md:flex-row items-start bg-[#EEF1F3] border-b-4 border-white  py-3 px-4 shadow-md sticky top-0 w-full z-[99] md:items-center gap-2 md:gap-4">
      <div
        className="flex items-center  justify-between"
        style={{ gap: "clamp(4.5rem, 3vw, 4rem)" }}
      >
        <div className="flex items-center gap-4">
          <div className="block md:hidden">
            <button
              className="text-blackfont-bold text-[6vw]"
              onClick={showDrawer}
            >
              <MdOutlineMenu />
            </button>
            <Drawer onClose={onClose} placement="top" open={open}>
              <div className="flex items-center justify-start gap-4 ml-2">
                <UserProfile onClose={onClose} />
              </div>
            </Drawer>
          </div>
          <div onClick={() => navigate("/")} className="logo cursor-pointer">
            <Logo />
          </div>
        </div>
        <div className="block md:hidden">
          {address.map((location, i) => (
            <p className="text-black font-bold roboto text-[3vw]" key={i}>
              {location.neighbourhood},{location.city},{location.state}
            </p>
          ))}
        </div>
      </div>
      {/* <div className="sell fixed bottom-10 left-[35%] z-[999] ">
        <button
          onClick={() => {
            isLoggedIn
              ? navigate("/post")
              : notification.error({ message: "Please log in first" });
          }}
          className="block md:hidden relative roboto font-medium uppercase"
        >
          <svg
            width="104"
            height="48"
            viewBox="0 0 1603 768"
            className="_20oLV"
          >
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
      </div> */}
      <div
        onClick={handleClick}
        className="hidden bg-white transition-[all.8s] active:scale-[.95] location cursor-pointer border-black border-2 py-2 px-6 text-[1.2vw] md:w-[38%] md:flex justify-center lg:w-[52%] rounded-sm overflow-x-auto"
      >
        <>
          {isClicked
            ? address.map((elem, i) => {
                console.log(elem);
                return (
                  <div
                    className="text-black roboto flex justify-center gap-2  w-[22vw]"
                    key={i}
                  >
                    <span className="inline-flex">
                      {elem.neighbourhood},{elem.city},{elem.state}
                    </span>
                  </div>
                );
              })
            : "use current location"}
        </>
      </div>
      <div className="search w-full lg:w-[50%] xl:w-full">
        <form action="">
          <div className="flex items-center">
            <input
              onChange={changeHandler}
              type="text"
              className="w-full bg-white text-[3vw] md:text-[1.2vw] border-black border-2 py-2.5 rounded-none px-3"
              placeholder="Find Cars, Mobile Phones and more..."
            />
          </div>
        </form>
      </div>
      <button  onClick={()=>navigate("/chat")} className="hidden md:block text-3xl font-bold text-[rgba(0,0,0,0.685)] transition-all hover:text-black">
      <RiChat1Line />
      </button>
      <button className="lang hidden md:block overflow-hidden p-3 w-[20%] bg-white">
        <div id="google_translate_element"></div>
      </button>

      <div className="hidden md:flex items-center gap-4 ml-2">
        {isLoggedIn ? (
          <UserProfile />
        ) : (
          <div
            onClick={showModal}
            className="login cursor-pointer underline-offset-2 roboto text-[1vw] flex items-center gap-1 font-medium  uppercase text-[#002E34] underline"
          >
            Login
          </div>
        )}
        <Modal
          title={isSignedUp ? "Log In" : "Sign UP"}
          open={isModalOpen}
          onCancel={() => setIsModalOpen(false)}
        >
          {isSignedUp ? (
            <LogIn
              setIsModalOpen={setIsModalOpen}
              setIsSignedUp={setIsSignedUp}
            />
          ) : (
            <SingnUp setIsSignedUp={setIsSignedUp} />
          )}
        </Modal>
        <button
          onClick={() => {
            isLoggedIn
              ? navigate("/post")
              : notification.error({ message: "Please log in first" });
          }}
          className="relative roboto font-medium uppercase"
        >
          <svg
            width="104"
            height="48"
            viewBox="0 0 1603 768"
            className="_20oLV"
          >
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
