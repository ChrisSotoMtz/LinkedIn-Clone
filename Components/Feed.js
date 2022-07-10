import React, { useEffect, useState } from "react";
import { useRecoilState } from "recoil";
import { getPostState } from "../atoms/postAtom";

import Input from "./Input";
import { handlePostState, useSSRPostsState } from "../atoms/postAtom";
import Post from "./Post";

function Feed({ posts }) {
  const [realtimePosts, setRealtimePosts] = useState([]);
  const [handlePost, setHandlePost] = useRecoilState(handlePostState);
  const [postState, setPostState] = useRecoilState(getPostState);

  const [useSSRPost, setUseSSRPost] = useRecoilState(useSSRPostsState);

  useEffect(() => {
    const fetchPosts = async () => {
      const response = await fetch("/api/post", {
        method: "GET",
        headers: { "Content-Type": "application/json" },
      });

      const responseData = await response.json();
      setRealtimePosts(responseData);
      setHandlePost(false);
      setUseSSRPost(false);
    };

    fetchPosts();
    console.log(realtimePosts);
  }, [handlePost]);

  return (
    <div className="space-y-6 pb-24 max-w-lg">
      <Input />

      {/* Post */}
      {!useSSRPost
        ? realtimePosts.map((post) => <Post key={post._id} post={post} />)
        : posts.map((post) => <Post key={post._id} post={post} />)}
      {/* server side post */}
    </div>
  );
}

export default Feed;
