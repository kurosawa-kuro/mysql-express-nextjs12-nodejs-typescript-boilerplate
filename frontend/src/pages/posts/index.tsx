// frontend\src\pages\posts\index.tsx

import React, { useState } from "react";
import { GetServerSideProps } from "next";
import Post from "@/components/Post/Post";
import PostForm from "@/components/Post/PostForm";
import apiClient from "@/services/apiClient";
import { PostType } from "@/types";

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

const PostsList: React.FC<{ initialPosts: PostType[] }> = ({
  initialPosts,
}) => {
  const [posts, setPosts] = useState<PostType[]>(initialPosts);
  const { postToServer } = useApiClient();

  const onSubmit = async (description: string) => {
    const newPost = await postToServer("/posts", { description });
    setPosts((prevPosts) => [newPost, ...prevPosts]);
  };

  return (
    <div className="min-h-screen bg-custom-blue-lightest">
      <main className="container mx-auto py-4">
        <PostForm onSubmit={onSubmit} />
        {/* Postslist */}
        {posts.map((post: PostType) => (
          <Post key={post.id} post={post} />
        ))}
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  const token = context.req.cookies.jwt;

  try {
    const posts: PostType[] = await apiClient
      .get("/posts", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);

    return {
      props: {
        initialPosts: posts,
      },
    };
  } catch (error) {
    console.error("Failed to fetch posts:", error);
    return {
      props: {
        initialPosts: [],
      },
    };
  }
};

export default PostsList;
