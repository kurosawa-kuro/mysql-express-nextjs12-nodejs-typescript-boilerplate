import React, { useEffect, useState } from "react";
import Post from "./Post";
import apiClient from "@/lib/apiClient";
import { PostType } from "../types";

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
  const [description, setDescription] = useState<string>("");
  const [posts, setPosts] = useState<PostType[]>([]);
  const { postToServer, getFromServer } = useApiClient();

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const newPost = await postToServer("/posts", { description });
    setPosts((prevPosts) => [newPost, ...prevPosts]);
    setDescription("");
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
        <div className="bg-custom-blue-light shadow-md rounded p-4 mb-4">
          <form onSubmit={handleSubmit}>
            <textarea
              className="w-full h-24 p-2 border border-gray-300 rounded resize-none focus:outline-none focus:ring-2 focus:ring-custom-blue-darker"
              placeholder="What's on your mind?"
              onChange={(e: React.ChangeEvent<HTMLTextAreaElement>) =>
                setDescription(e.target.value)
              }
              value={description}
            ></textarea>
            <button
              type="submit"
              className="mt-2 bg-custom-green-light hover:bg-custom-green-dark duration-200 text-white font-semibold py-2 px-4 rounded"
            >
              投稿
            </button>
          </form>
        </div>
        {posts.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export default PostsList;
