import React, { useContext } from "react";
import app from "../../images/phone-app.webp";
import playstore from "../../images/playstore_2x.webp";
import appstore from "../../images/appstore.webp";
import { footerLinks } from "./links";
import { FaPlus } from "react-icons/fa";
import { notification } from "antd";
import { LoginContext } from "../../contexts/Login/LoginContext";
import { useNavigate } from "react-router-dom";
const Footer = () => {
  const {isLoggedIn}=useContext(LoginContext)
  const navigate = useNavigate()
  return (
    <div className="relative">
      <div>
        <div className="hidden head md:flex justify-center items-center w-full bg-[rgba(0,47,52,0.03)]">
          <div className="w-[33.33%]">
            <div className="app_img relative">
              <img
                src={app}
                alt="app-img"
                className="object-cover h-full w-full"
              />
            </div>
          </div>
          <div className="ml-8 w-[33.33%] border-r-[3px] border-[rgba(14,4,5,0.2)]">
            <div>
              <h1 className="uppercase roboto font-bold text-[2.8vw] text-[#002f34]  my-4">
                Try The OLX APP
              </h1>
            </div>
            <div>
              <p className="text-[1.6vw] roboto leading-[24px]">
                Buy, sell and find just about anything using the app on your
                mobile.
              </p>
            </div>
          </div>

          {/* <div className='w-0.5 h-[150px] bg-[rgba(14,4,5,0.2)] my-16'>


            </div> */}
          <div className="ml-8 w-[33.33%]  ">
            <div>
              <p className="text-[1.2vw] uppercase roboto font-medium text-[#002f34]">
                Get your app today
              </p>
              <div className="flex items-center mt-3 gap-3">
                <div className="app_img relative">
                  <img
                    src={playstore}
                    alt="app-img"
                    className="object-cover h-full w-full"
                  />
                </div>
                <div className="app_img relative">
                  <img
                    src={appstore}
                    alt="app-img"
                    className="object-cover h-full w-full"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
      <div className="links md:px-32  bg-[rgba(235,238,239,1)] flex items-start flex-wrap p-4 justify-between">
        {footerLinks.map((link, i) => (
          <div className="my-3" key={i}>
            <h1 className="font-semibold roboto text-black text-[4.8vw] md:text-[1.3vw]">
              {link.title}
            </h1>
            <ul>
              {link.subLinks.map((sub, j) => (
                <li className="text-gray-500 text-[3vw] md:text-[1vw] my-1" key={j}>
                  <a href="#">{sub}</a>
                </li>
              ))}
            </ul>
          </div>
        ))}
      </div>
      
    </div>
  );
};

export default Footer;
