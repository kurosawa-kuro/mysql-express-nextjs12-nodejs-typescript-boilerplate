import { GetServerSideProps } from "next";
import { useRouter } from "next/router";
import apiClient from "@/services/apiClient";
import { PostType } from "@/types";

const PostDetail: React.FC<{ post: PostType }> = ({ post }) => {
  const router = useRouter();
  const { id } = router.query;

  return (
    <div className="min-h-screen bg-custom-blue-lightest">
      <main className="container mx-auto py-4">
        <h1 className="text-2xl font-bold mb-4">Post Detail: {id}</h1>
        <div className="border p-4">
          <p>{post.description}</p>
        </div>
      </main>
    </div>
  );
};

export const getServerSideProps: GetServerSideProps = async (context) => {
  if (!context.params) return { notFound: true };

  const { id } = context.params;
  const token = context.req.cookies.jwt;

  try {
    const post: PostType = await apiClient
      .get(`/posts/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((response) => response.data);

    return {
      props: {
        post,
      },
    };
  } catch (error) {
    console.error("Failed to fetch the post:", error);
    return {
      notFound: true, // This will return a 404 page
    };
  }
};

export default PostDetail;
