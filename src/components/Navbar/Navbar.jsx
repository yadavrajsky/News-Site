import React, { useEffect, useState, useRef } from "react";
import { Link } from "react-router-dom";
import { TbLayoutDashboard } from "react-icons/tb";
import { AiOutlineMenuUnfold, AiOutlineMenuFold } from "react-icons/ai";
import { FiSun, FiMoon } from "react-icons/fi";
import {
  FaBriefcase,
  FaFilm,
  FaHeartbeat,
  FaFootballBall,
  FaLaptop,
  FaFlask,
} from "react-icons/fa";

const navLinks = [
  {
    title: "Top News",
    link: "/",
    icon: <TbLayoutDashboard />,
  },
  {
    title: "Business",
    link: "/business",
    icon: <FaBriefcase />,
  },
  {
    title: "Entertainment",
    link: "/entertainment",
    icon: <FaFilm />,
  },
  {
    title: "Health",
    link: "/health",
    icon: <FaHeartbeat />,
  },
  {
    title: "Science",
    link: "/science",
    icon: <FaFlask />,
  },
  {
    title: "Sports",
    link: "/sports",
    icon: <FaFootballBall />,
  },
  {
    title: "Technology",
    link: "/technology",
    icon: <FaLaptop />,
  },
];

export default function Navbar() {
  const [isMobileNavOpen, setisMobileNavOpen] = useState(false);
  const mobileNavRef = useRef(null);
  const [theme, setTheme] = useState(
    localStorage.theme === "dark" ||
      (!("theme" in localStorage) &&
        window.matchMedia("(prefers-color-scheme: dark)").matches)
      ? "dark"
      : "light"
  );

  const toggleTheme = () => {
    const newTheme = theme === "dark" ? "light" : "dark";
    setTheme(newTheme);
    localStorage.theme = newTheme;
  };

  const handleClickOutside = (event) => {
    if (mobileNavRef.current && !mobileNavRef.current.contains(event.target)) {
      setisMobileNavOpen(false);
    }
  };

  useEffect(() => {
    if (isMobileNavOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMobileNavOpen]);

  useEffect(() => {
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [theme]);

  return (
    <div className={`dark:bg-gray-700`}>
      <div className="flex flex-wrap pb-2 ">
        <div className="w-full">
          {/* Desktop Navbar */}
          <div className="mx-auto">
            <div className="w-full flex flex-1 justify-between items-center p-2 rounded-lg shadow-lg font-medium ">
              {/* Logo */}
              <div className="flex">
                <span className="px-2 mr-2">
                  <img
                    src="/logo.svg"
                    alt="New Logo"
                    className="h-8 w-14 inline mx-auto dark:text-white"
                  />
                  <Link
                    to={"/"}
                    className={` dark:text-white ${
                      theme === "dark" ? "text-white" : "text-black"
                    }`}
                  >
                    Dhakad News{" "}
                  </Link>
                </span>
              </div>

              <div className="flex items-center order-2">
                {/* Hamberger Menu  */}
                <div className="md:hidden transition-all mr-3 my-3 cursor-pointer dark:text-white hover:text-gray-700">
                  {isMobileNavOpen ? (
                    <AiOutlineMenuFold
                      onClick={() => setisMobileNavOpen(false)}
                      className="rounded text-2xl"
                    />
                  ) : (
                    <AiOutlineMenuUnfold
                      onClick={() => setisMobileNavOpen(true)}
                      className="rounded text-2xl"
                    />
                  )}
                </div>
              </div>

              <div className="px-2 md:flex gap-x-5 items-center justify-center flex-1 text-gray-900 font-medium  dark:text-white hidden">
                {navLinks?.map(({ title, link, icon }, id) => (
                  <Link key={id} to={link}>
                    <span
                      id={id}
                      className={`px-2 py-1 flex items-center cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm rounded`}
                    >
                      <span className="p-2 dark:bg-white dark:text-black rounded-full">
                        {icon}
                      </span>
                      <span className="mx-1   hover:text-gray-700 ">
                        {title}
                      </span>
                    </span>
                  </Link>
                ))}
              </div>
              <div></div>
            </div>
          </div>

          {/* Mobile Navbar */}
          <div
            ref={mobileNavRef}
            className={`pt-0 absolute top-2 z-100 mx-auto ${
              isMobileNavOpen ? "translate-x-0" : "-translate-x-full"
            } transition-all flex-wrap md:hidden`}
          >
            <div className="py-[.5px] w-64">
              <div className="w-full py-4 px-2 text-gray-900 bg-white rounded-lg min-h-screen  text-right  font-medium shadow-lg dark:bg-gray-900">
                {/* Logo */}
                <div className="flex">
                  <span className="px-2 mr-2">
                    <img
                      src="/logo.svg"
                      alt="New Logo"
                      className="h-8 w-14 inline mx-auto"
                    />

                    <Link
                      to={"/"}
                      className={`ml-3 dark:text-white ${
                        theme === "dark" ? "text-white" : "text-black"
                      }`}
                    >
                      Dhakad News{" "}
                    </Link>
                  </span>
                </div>
                {/* Links */}
                <div className="mt-3">
                  {navLinks?.map(({ title, link, icon }, id) => (
                    <Link key={id} to={link}>
                      <span
                        id={id}
                        className={`px-2 py-1 flex items-center cursor-pointer hover:bg-gray-200 hover:text-gray-700 text-sm rounded`}
                      >
                        <span className="p-2 dark:bg-white dark:text-black rounded-full">
                          {icon}
                        </span>
                        <span className="mx-1 dark:text-white  hover:text-gray-700 ">
                          {title}
                        </span>
                      </span>
                    </Link>
                  ))}
                </div>

                <div></div>
              </div>
            </div>
          </div>
        </div>
      </div>
      {/* Theme Toggle Button */}
      <div className="fixed bottom-5 right-5 dark:text-white">
        <button onClick={toggleTheme} title="Theme Switcher">
          {theme === "dark" ? (
            <>
              <FiSun />
            </>
          ) : (
            <>
              <FiMoon />{" "}
            </>
          )}
        </button>
      </div>
    </div>
  );
}
