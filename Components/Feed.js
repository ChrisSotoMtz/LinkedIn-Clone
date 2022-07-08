import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import Input from "./Input";

function Feed() {
  const [realtimePosts, setRealtimePosts] = useState([]);
  const [handdlePost, setHanddlePost] = useRecoilState(handdlePostState);
  const [useSSRPost, setUseSSRPost] = useRecoilState(useSSRPostState);

  useEffect(() => {
    const fetchPost = async () => {
      const response = await fetch("/api/post", {
        method: "GET",
        headers: {
          "Content-Type": "application/json",},
      });

      const responseData = await response.json();
      setRealtimePosts(responseData);
    }


  }, [handdlePost]);
  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />

      {/* Post */}
      {/* server side post */}
    </div>
  );
}

export default Feed;
