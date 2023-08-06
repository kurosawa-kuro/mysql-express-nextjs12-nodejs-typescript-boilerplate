import Head from "next/head";
import Image from "next/image";
import styles from "@/styles/Home.module.css";
import PostsList from "@/components/Post/PostsList";

export default function Home() {
  return (
    <>
      <Head>
        <title>Next.js 12 with Tailwind and Zustand</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div>
        <PostsList />
      </div>
    </>
  );
}
