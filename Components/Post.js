import { Avatar, Icon, IconButton } from "@mui/material";
import React, { useState } from "react";
import CloseRoundedIcon from "@mui/icons-material/CloseRounded";
import MoreHorizRoundedIcon from "@mui/icons-material/MoreHorizRounded";
import ThumbUpOffAltOutlinedIcon from "@mui/icons-material/ThumbUpOffAltOutlined";
import ThumbUpOffAltRoundedIcon from "@mui/icons-material/ThumbUpOffAltRounded";
import { useRecoilState } from "recoil";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import ReactTimeAgo from "react-time-ago";
import { handlePostState, getPostState } from "../atoms/postAtom";
import CommentOutlonedIcon from "@mui/icons-material/CommentOutlined";
import { parse } from "postcss";
import { useSession } from "next-auth/react";
import DeleteRoundedIcon from "@mui/icons-material/DeleteRounded";
import ReplyRoundedIcon from "@mui/icons-material/ReplyRounded";
import CommentOutlinedIcon from "@mui/icons-material/CommentOutlined";

function Post({ post, modalPost }) {
  const [modalOpen, setModalOpen] = useRecoilState(modalState);
  const [showInput, setShowInput] = useState(false);
  const [postState, setPostState] = useRecoilState(getPostState);
  const [modalType, setModalType] = useRecoilState(modalTypeState);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);

  const [liked, setLiked] = useState(false);
  const { data: session } = useSession();

  const truncate = (string, n) =>
    string?.length > n ? string.substr(0, n - 1) + "...see more" : string;


    const deletePost = async() => {
      const reponse = await fetch(`/api/post/${post._id}`,{
        method: "DELETE",
        headers: { "Content-Type": "application/json" },

      });

      setHandlePost(true);
      setModalOpen(false);

    };
  return (
    <div
      className={`bg-white dark:bg-[#1d2226] ${
        modalPost ? "rounded-r-lg" : "rounded-lg"
      } space-y-2 py-2.5 border border-gray-300 dark:border-none`}
    >
      <div className="flex items-center px-2.5 cursor-pointer">
        <Avatar src={post.userImg} className="!h-10 !w-10 cursor-pointer" />
        <div className="mr-auto ml-2 leading-none">
          <h6 className="font-medium hover:text-blue-500 hover:underline">
            {post.username}
          </h6>
          <p className="text-sm dark:text-white/75 opacity-80">{post.email}</p>
          <ReactTimeAgo
            date={post.createdAt}
            className="text-xs dark:text-white/75 opacity-80"
          />
        </div>
        {modalPost ? (
          <IconButton onClick={() => setModalOpen(false)}>
            <CloseRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        ) : (
          <IconButton>
            <MoreHorizRoundedIcon className="dark:text-white/75 h-7 w-7" />
          </IconButton>
        )}
      </div>

      {post.input && (
        <div className="px-2.5 break-all md:break-normal">
          {modalPost || showInput ? (
            <p onClick={() => setShowInput(false)}>{post.input}</p>
          ) : (
            <p onClick={() => setShowInput(true)}>
              {truncate(post.input, 150)}
            </p>
          )}
        </div>
      )}

      {post.photo && !modalPost && (
        <img
          src={post.photo}
          className="w-full cursor-pointer"
          onClick={() => {
            setModalOpen(true);
            setModalType("gifYouUp");
            setPostState(post);
          }}
        />
      )}
      <div className="flex justify-evenly items-center dark:border-t border-gray-600/80 mx-2.5 pt-2 text-black/60 dark:text-white/75">
        {modalPost ? (
          <button className="postButton">
            <CommentOutlonedIcon />
            <h4>Comment</h4>
          </button>
        ) : (
          <button
            className={`postButton ${liked && "text-blue-500"}`}
            onClick={() => setLiked(!liked)}
          >
            {liked ? (
              <ThumbUpOffAltRoundedIcon className="-scale-x-100" />
            ) : (
              <ThumbUpOffAltOutlinedIcon className="-scale-x-100" />
            )}

            <h4>Like</h4>
          </button>
        )}

        {session?.user?.email === post.email ? (
          <button className="postButton hover:text-red-400" onClick={deletePost}>
            <DeleteRoundedIcon className="-scale-x-100"/>
            <h4>Delete Post</h4>
          </button>
        ): (
          <button className="postButton">
            <ReplyRoundedIcon className="-scale-x-100"/>
            <h4>Share</h4>
          </button>
        )}
      </div>
    </div>
  );
}

export default Post;
