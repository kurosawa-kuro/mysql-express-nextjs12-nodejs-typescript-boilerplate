// frontend\src\components\Post.tsx

import { PostType } from "@/types";
// import Image from "next/image";
import Link from "next/link";
import React from "react";

type Props = {
  post: PostType;
};

const PostItem = (props: Props) => {
  const { post } = props;

  return (
    <div className="bg-custom-blue-lightest shadow-md rounded p-4 mb-4">
      <div className="mb-4">
        <div className="flex items-center mb-2">
          <Link href={`/`}>
            <img
              src="https://placehold.co/600x400"
              className="w-10 h-10 rounded-full mr-2"
              alt="User Avatar"
            />
          </Link>
          <div>
            <h2 className="font-semibold text-md text-custom-blue-dark">
              {post.user?.name}
            </h2>
            <p className="text-gray-500 text-sm">
              {new Date(post.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
        <p className="text-gray-700">{post.description}</p>
      </div>
    </div>
  );
};

export default PostItem;
