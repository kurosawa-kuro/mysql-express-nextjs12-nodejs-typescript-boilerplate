// frontend\src\components\Post\PostsList.tsx

import React, { useEffect, useState } from "react";
import Post from "./Post";
import PostForm from "./PostForm";
import apiClient from "@/services/apiClient";
import { PostType } from "../../types";

const useApiClient = () => {
  const postToServer = async (url: string, data: any) => {
    try {
      const newPost = await apiClient
        .post(url, data)
        .then((response) => response.data);
      return newPost;
    } catch (err) {
      console.log("err", err);
      alert("ログインしてください。");
    }
  };

  const getFromServer = async (url: string) => {
    try {
      const response = await apiClient
        .get(url)
        .then((response) => response.data);

      return response;
    } catch (err) {
      console.log(err);
    }
  };

  return { postToServer, getFromServer };
};

const PostsList = () => {
  const [posts, setPosts] = useState<PostType[]>([]);
  const { postToServer, getFromServer } = useApiClient();

  const onSubmit = async (description: string) => {
    const newPost = await postToServer("/posts", { description });
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  const readPosts = async () => {
    const response = await getFromServer("/posts");
    setPosts(response);
  };

  useEffect(() => {
    readPosts();
  }, []);

  return (
    <div className="min-h-screen bg-custom-blue-lightest">
      <main className="container mx-auto py-4">
        <PostForm onSubmit={onSubmit} />
        {posts.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default PostsList;
