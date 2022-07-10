import React, { useState } from "react";
import { modalState, modalTypeState } from "../atoms/modalAtom";
import { useRecoilState } from "recoil";
import { getSession, signOut, useSession } from "next-auth/react";
import { handlePostState } from "../atoms/postAtom";

function Form() {
  const [input, setInput] = useState("");
  const [photo, setPhoto] = useState("");
  const [modalOpen, setModalOpen] = useRecoilState(modalState);

  const { data: session } = useSession();
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);


  const uploadPost = async (e) => {
    e.preventDefault();
    const response = await fetch("/api/post", {
      method: "POST",
      body: JSON.stringify({
        input: input,
        photo: photo,
        username: session.user.name,
        email: session.user.email,
        userImg: session.user.image,
        createdAt: new Date().toString(),
      }),
      headers: {
        "Content-Type": "application/json",
      }
    });


    const responseData = await response.json();
    setHandlePost(true);
    setModalOpen(false);
  };

  return (
    <form className="flex flex-col relative space-y-2 text-black/80 dark:text-white/75">
      <textarea
        rows="4"
        placeholder="What do you want to talk about?"
        className="bg-transparent focus:outline-none dark:placeholder-white/75 w-full text-center resize-none"
        value={input}
        onChange={(e) => setInput(e.target.value)}
      />
      <input
        type="text"
        placeholder="Add a photo URL (optional)"
        className="bg-transparent focus:outline-none truncate max-w-xs md:max-w-sm dark:placeholder-white/75"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />
      <div className="relative py-5">
        <button
          type="submit"
          value="Submit"
          className="absolute right-2 top-2 py-1 px-4 rounded-full 
        dark:text-[#1d2226] bg-blue-500"
          disabled={!input.trim() && !photo}
          onClick={uploadPost}
        >
          Post
        </button>
      </div>
    </form>
  );
}

export default Form;
