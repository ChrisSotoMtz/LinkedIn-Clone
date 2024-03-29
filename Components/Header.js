import Image from "next/image";
import React, { useEffect } from "react";
import HeaderLink from "./HeaderLink";
import SearchRoundedIcon from "@mui/icons-material/SearchRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import ChatIcon from "@mui/icons-material/Chat";
import NotificationsIcon from "@mui/icons-material/Notifications";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import AppsOutlinedIcon from "@mui/icons-material/AppsOutlined";
import { Avatar } from "@mui/material";
import { useTheme } from "next-themes";
import { motion } from "framer-motion";

const spring = {
  type: "spring",
  stiffness: 700,
  damping: 30,
};

{/*header nav bar on  main page */}
function Header() {
  {/*hooks for the theme implementation */}
  const [mounted, setMounted] = React.useState(false);
  const { setTheme, resolvedTheme, theme } = useTheme();

  useEffect(() => setMounted(true), []);
  return (
    <header className="sticky top-0 z-40 bg-[#ffffff] dark:bg-[#1D2226] flex items-center justify-around py-1.5 px-3 focus-within:shadow-lg">
      {/* Left */}
      <div className="flex items-center space-x-2 w-full max-w-xs">
        {mounted && (
          <>
            {resolvedTheme === "dark" ? (
              <Image  src="https://firebasestorage.googleapis.com/v0/b/reactprueba-3ebdd.appspot.com/o/siteImg%2Flinkedin-dark.png?alt=media&token=db65ed82-9dc8-4faf-9848-625e574d1e05"  width={45} height={45} />
            ) : (
              <Image src="https://firebasestorage.googleapis.com/v0/b/reactprueba-3ebdd.appspot.com/o/siteImg%2Flinkedin-ligth.png?alt=media&token=f88b6b11-0db8-4ab0-b367-bdf30090e1ed"
               width={55} height={55} />
            )}
          </>
        )}

        <div className=" flex items-center space-x-1 dark:md:bg-gray-700 py-2.5 px-4 rounded w-full ">
          <SearchRoundedIcon />
          <input
            type="text"
            placeholder="Search"
            className="hidden md:inline-flex bg-transparent text-sm focus:outline-none placeholder-black/70 dark:placeholder-white/75 flex-grow"          />
        </div>
      </div>
      {/* Right */}

      <div className="flex items-center space-x-6">
        <HeaderLink Icon={HomeRoundedIcon} text="Home" feed active />
        <HeaderLink Icon={GroupRoundedIcon} text="My Network" feed />
        <HeaderLink Icon={BusinessCenterRoundedIcon} text="Jobs" feed hidden />
        <HeaderLink Icon={ChatIcon} text="Messaging" feed />
        <HeaderLink Icon={NotificationsIcon} text="Notifications" feed />
        <HeaderLink Icon={Avatar} text="Me" feed avatar hidden />
        <HeaderLink Icon={AppsOutlinedIcon} text="Work" feed hidden />

        {/* Dark mode toggle */}
        {mounted && (
          <div
            className={`bg-gray-600 flex items-center px-0.5 rounded-full h-6 w-12 cursor-pointer flex-shrink-0 relative ${
              resolvedTheme === "dark" ? "justify-end" : "justify-start"
            }`}
            onClick={() =>
              setTheme(resolvedTheme === "dark" ? "light" : "dark")
            }
          >
            <span className="absolute left-0">🌜</span>
            <motion.div
              className="w-5 h-5 bg-white rounded-full z-40"
              layout
              transition={spring}
            />

            <span className="absolute right-0.5">🌞</span>
          </div>
        )}
      </div>
    </header>
  );

}

export default Header;
