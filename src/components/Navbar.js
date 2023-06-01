import React, { useState, useEffect, useRef } from "react";
import close_icon from "../assets/close_icon.svg";
import { useTranslation } from "react-i18next";
import i18n from "../i18n";
import english from "../assets/english.png";
import estonian from "../assets/estonian.png";
import { AuthContext } from "../Store/AuthContext";
import { CartSumContext } from "../Store/CartSumContext";
import { Link, useNavigate } from "react-router-dom";
import { useContext } from "react";
import Nav from "react-bootstrap/Nav";

function useOutsideAlerter(ref, setOpenNav) {
  useEffect(() => {
    function handleClickOutside(event) {
      if (ref.current && !ref.current.contains(event.target)) {
        setOpenNav(false);
      }
    }

    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);
}

const Navbar = ({ logo }) => {
  const { t, i18n } = useTranslation();
  const [openNav, setOpenNav] = useState(false);

  const wrapperRef = useRef(null);
  useOutsideAlerter(wrapperRef, setOpenNav);

  const updateLanguage = (newLang) => {
    i18n.changeLanguage(newLang);
    localStorage.setItem("language", newLang);
    i18n.reloadResources();
  };

  const { cartSum } = useContext(CartSumContext);

  const { loggedIn, setLoggedIn } = useContext(AuthContext);
  const navigate = useNavigate();

  const logout = () => {
    setLoggedIn(false);
    navigate("/");
    sessionStorage.removeItem("token");
  };

  return (
    <div className="flex flex-row items-center justify-between h-28 pr-10">
      <div className="flex items-center">
        {logo && (
          <a href="/" className="pl-7 logo lg:ml-10">
            <img height="65%" width="65%" src={logo} alt="logo" />
          </a>
        )}
        <div className="lg:hidden flex justify-start">
          <button
            onClick={() => setOpenNav(!openNav)}
            className="p-2 focus:outline-none"
          >
            {openNav ? (
              <img src={close_icon} alt="close" className="w-5 h-5" />
            ) : (
              <span className="text-blue-800 text-lg">☰</span>
            )}
          </button>
          {openNav && (
            <div
              ref={wrapperRef}
              className="absolute top-0 w-full h-48 bg-white ml-10"
            >
              {/* Menu links */}
              <a
                href="/home"
                className="block py-2 px-4 text-lg font-semibold text-blue-800 transition-all hover:text-orange-500"
              >
                {t("Home")}
              </a>
              <a
                href="#product"
                className="block py-2 px-4 text-lg font-semibold text-blue-800 transition-all hover:text-orange-500"
              >
                {t("Products")}
              </a>
              <a
                href="#faq"
                className="block py-2 px-4 text-lg font-semibold text-blue-800 transition-all hover:text-orange-500"
              >
                {t("Faq")}
              </a>
              <a
                href="#contact"
                className="block py-2 px-4 text-lg font-semibold text-blue-800 transition-all hover:text-orange-500"
              >
                {t("Contact")}
              </a>
              <a
                href="#prices"
                className="block py-2 px-4 text-lg font-semibold text-blue-800 transition-all hover:text-orange-500"
              >
                {t("Prices")}
              </a>
            </div>
          )}
        </div>
      </div>
      <div className="flex items-center ">
        {/* Desktop Nav */}
        <div className="hidden lg:flex items-center  ">
          {/* Menu links */}
          <a
            href="/home"
            className="text-lg font-semibold text-blue-800 transition-all hover:text-orange-500 ml-10"
          >
            {t("Home")}
          </a>
          <a
            href="#product"
            className="text-lg font-semibold text-blue-800 transition-all hover:text-orange-500 ml-5"
          >
            {t("Products")}
          </a>
          <a
            href="#faq"
            className="text-lg font-semibold text-blue-800 transition-all hover:text-orange-500 ml-5"
          >
            {t("Faq")}
          </a>
          <a
            href="#prices"
            className="text-lg font-semibold text-blue-800 transition-all hover:text-orange-500 ml-5"
          >
            {t("Prices")}
          </a>
          <a
            href="#contact"
            className="text-lg font-semibold text-blue-800 transition-all hover:text-orange-500 ml-5 mr-60"
          >
            {t("Contact")}
          </a>
        </div>
        <div className="flex items-center ml-auto space-x-5 mr-5">
          {/* Cart */}
          <Link to="/cart" className="mr-2">
            <img
              src="/cart.png"
              alt="cart picture"
              className="w-10 h-10 "
              style={{ maxWidth: "100%", maxHeight: "100%", display: "block" }}
            />
          </Link>
          {/* <div className="hidden sm:block">{cartSum} €</div> */}
          {/* Login/Logout */}
          {loggedIn === true ? (
            <button onClick={logout} className="text-gray-500 font-bold">
              {t("Logout")}
            </button>
          ) : (
            <>
              <a href="/login" className="text-gray-500 font-bold">
                {t("Login")}
              </a>
              <a href="/signup" className="text-gray-500 font-bold">
                {t("Register")}
              </a>
            </>
          )}
          {/* Language options */}
          <img
            src={estonian}
            alt="ee"
            onClick={() => updateLanguage("ee")}
            className="w-6 h-6 cursor-pointer ml-5 mt-1.5"
          />
          <img
            src={english}
            alt="en"
            onClick={() => updateLanguage("en")}
            className="w-6 h-6 cursor-pointer ml-"
          />
        </div>
      </div>
    </div>
  );
};

export default Navbar;
