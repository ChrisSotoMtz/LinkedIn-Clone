import { useSession } from "next-auth/react";
import React from "react";
import { motion } from "framer-motion";
import { Avatar } from "@mui/material";
import PhotoSizeSelectActualIcon from "@mui/icons-material/PhotoSizeSelectActual";
import VideoCameraBackIcon from "@mui/icons-material/VideoCameraBack";
import BusinessCenterRounded from "@mui/icons-material/BusinessCenterRounded";
import ArticleIcon from "@mui/icons-material/Article";
import {useRecoilState} from "recoil";
import {modalState,modalTypeState} from "../atoms/modalAtom";

function Input() {
    {/*Session hook used to retrive the user image */}
  const { data: session } = useSession();
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);

  return (
    <div className="bg-white dark:bg-[#1d2226] rounded-lg p-3 space-y-3 border border-gray-300 dark:border-none">
      <div className="flex items-center space-x-2">
        <Avatar
          src={session?.user?.image}
          className="h-10 w-10 cursor-pointer"
        />
        <motion.button
          onClick={() => {
            setModalOpen(true);
            setModalType("dropIn");
          }}
          whileHover={{ scale: 1.01 }}
          whileTap={{ scale: 0.99 }}
          className="rounded-full border border-gray-400
            py-2.5 px-3 opacity-80 hover:opacity-100 font-medium w-full text-left"
        >
          Start a post
        </motion.button>
      </div>

      {/*Button Group */}
      <div className="flex items-center flex-wrap gap-4 justify-center md:gap-x-10">

        <button className="inputButton group">
          <PhotoSizeSelectActualIcon className="text-blue-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Photo</h4>
        </button>
        <button className="inputButton group">
          <VideoCameraBackIcon className="text-green-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Video</h4>
        </button>
        <button className="inputButton group">
          <BusinessCenterRounded className="text-red-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Job</h4>
        </button>
        <button className="inputButton group">
          <ArticleIcon className="text-purple-400" />
          <h4 className="opacity-80 group-hover:opacity-100">Article</h4>
        </button>
      </div>
    </div>
  );
}

export default Input;
