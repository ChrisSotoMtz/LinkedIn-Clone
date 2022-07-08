import React, { useState } from "react";

function Form() {
  const [input, setInput] = useState("");
  const [photo, setPhoto] = useState("");

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
        type="file"
        id="myFile"
        name="filename"
        className=" hiddenbg-transparent focus:outline-none rounded-full w-full  text-center mx-auto i hidden"
        accept="image/*"
        value={photo}
        onChange={(e) => setPhoto(e.target.value)}
      />
      <label htmlFor="myFile" className="text-blue-500 font-semibold transition-all hover:bg-blue-200 rounded-sm p-2">
        Add a file
      </label>
        <div className="relative py-5">
        <button type="submit" value="Submit" className="absolute right-2 top-2 py-1 px-4 rounded-full 
        dark:text-[#1d2226] bg-blue-500"
        disabled={!input.trim() && !photo}>
        
      
        Post
      </button>
        </div>
    </form>
  );
}

export default Form;
