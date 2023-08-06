// frontend\src\components\PostForm.tsx

import React, { useState } from "react";

interface Props {
  onSubmit: (description: string) => Promise<void>;
}

const PostForm: React.FC<Props> = ({ onSubmit }) => {
  const [description, setDescription] = useState<string>("");

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    await onSubmit(description);
    setDescription("");
  };

  return (
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
  );
};

export default PostForm;
