import React from "react";
import HeaderLink from "../Components/HeaderLink.js";
import ExploreRoundedIcon from "@mui/icons-material/ExploreRounded";
import GroupRoundedIcon from "@mui/icons-material/GroupRounded";
import OndemandVideoRoundedIcon from "@mui/icons-material/OndemandVideoRounded";
import BusinessCenterRoundedIcon from "@mui/icons-material/BusinessCenterRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";
import { getProviders, signIn } from "next-auth/react";
import Image from "next/image";
import next from "next";
function Home({ providers }) {
  console.log(providers);
  return (
    <div>
      <header className="flex justify-around items-center py-4 xl:mx-40 ">
        <div className="relative w-36 h-10">
          <Image src='https://firebasestorage.googleapis.com/v0/b/reactprueba-3ebdd.appspot.com/o/siteImg%2FLinkedIn_Logo.png?alt=media&token=79c30f72-0ef2-4cc8-bcbe-e6433cfcc2ed' layout="fill" objectFit="contain" />
        </div>
        <div className="flex items-center sm:divide-x divide-gray-300">
          <div className="hidden sm:flex space-x-8 pr-4">
            <HeaderLink Icon={ExploreRoundedIcon} text="Discover" />
            <HeaderLink Icon={GroupRoundedIcon} text="People" />
            <HeaderLink Icon={OndemandVideoRoundedIcon} text="Learning" />
            <HeaderLink Icon={BusinessCenterRoundedIcon} text="Jobs" />
          </div>

          <div className="pl-4">
            {Object.values(providers).map((provider) => (
              <div key={provider.name}>
                <div className="pl-4">
                  <button className="text-gray-700 font-semibold rounded-full   px-5 py-1.5 transition-all hover:bg-gray-100 mr-2">
                    Join now
                  </button>
                  <button
                    className="text-blue-700 font-semibold rounded-full border border-blue-700  px-5 py-1.5 transition-all hover:border-2"
                    onClick={() => signIn(provider.id, { callbackUrl: "/" })}
                  >
                    Sign in
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </header>
      <main className="flex flex-col xl:flex-row items-center max-w-screen-lg mx-auto">
        <div className="relative space-y-6 xl:space-y-10 xl:right-14">
          <h1 className="  text-3xl md:text-5xl text-amber-800/80 max-w-xl !leading-snug  xl:pl-0 xs:text-center xl:text-left">
            Welcome to your professional community
          </h1>

          <div className="space-y-4 ">
            <div className="intent border border-gray-300 sm:col-12">
              <h2 className="text-xl">Search for a job</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent border border-gray-300">
              <h2 className="text-xl">Find a person you know</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
            <div className="intent border border-gray-300">
              <h2 className="text-xl">Learn a new skill</h2>
              <ArrowForwardIosRoundedIcon className="text-gray-700" />
            </div>
          </div>
        </div>
        <div className="relative xl:absolute w-80 h-80 xl:w-[650px] xl:h-[650px] top-14 xl:right-10">
          <Image src={"/landingImage.svg"} layout="fill" />
        </div>
      </main>

      <div className="w-full bg-[#f3f2f0]">
        <div className="flex flex-col xl:flex-row items-center max-w-screen-xl xl:mx-auto mt-80 xl:p-20 md:space-x-10">
          <h1 className="  text-3xl md:text-5xl text-black max-w-xl !leading-snug  xl:pl-0 xs:text-center xl:text-left mb-8 ">
            Explore topics you are interested in
          </h1>

          <div className="grid grid-rows-4 grid-flow-row-dense md:grid-cols-3 grid-cols-2 gap-2 mr-5 ">
            <button className="text-blue-700 font-semibold rounded-full border border-blue-700   transition-all hover:border-2">
              See all topics
            </button>
            <button className="text-gray-700 font-semibold rounded-full border border-gray-700    transition-all hover:bg-gray-300 ">
              Remote
            </button>
            <button className="text-gray-700 font-semibold rounded-full border border-gray-700    transition-all hover:bg-gray-300 ">
              Work from Home
            </button>
            <button className="text-gray-700 font-semibold rounded-full border border-gray-700  transition-all hover:bg-gray-300 ">
              Retirement
            </button>
            <button className="text-gray-700 font-semibold rounded-full border border-gray-700    transition-all hover:bg-gray-300 ">
              Interships
            </button>
            <button className="text-gray-700 font-semibold rounded-full border border-gray-700    transition-all hover:bg-gray-300 ">
              Freelancer
            </button>
            <button className="text-gray-700 font-semibold rounded-full border border-gray-700    transition-all hover:bg-gray-300 ">
              Salary and compensation
            </button>
            <button className="text-gray-700 font-semibold rounded-full border border-gray-700    transition-all hover:bg-gray-300 ">
              Starting a job
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Home;

export async function getServerSideProps(context) {
  const providers = await getProviders();
  return {
    props: {
      providers,
    },
  };
}
