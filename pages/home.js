import React from "react";
import HeaderLink from "../Components/HeaderLink.js";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

import Image from "next/image";
function Home() {
  return (
    <div>
      <header className="flex justify-around items-center py-4">
        <div className="relative w-36 h-10">
          <Image src="/LinkedIn_Logo.png" layout="fill" objectFit="contain" />
        </div>
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={ExploreRoundedIcon} text="Discover" />
            <HeaderLink Icon={GroupRoundedIcon} text="People" />
            <HeaderLink Icon={OndemandVideoRoundedIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterRoundedIcon} text="Jobs" />
          </div>

          <div className="pl-4">
            <button className="text-blue-700 font-semibold rounded-full border border-blue-700  px-5 py-1.5 transition-all hover:border-2">
              Sign in
            </button>
          </div>
        </div>
      </header>

      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
        <div className="space-y-6 xl:space-y-10">
          <h1 className="text-3xl md:text-5xl text-amber-800/80 max-w-xl leading-snug pl-4 xl:pl-0">
            Welcome to you professional community
          </h1>

          <div className="space-y-4">
            <div className="intent">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
          </div>

          <Image />
        </div>
      </main>
    </div>
  );
}

export default Home;
