import PostCard from "../components/PostCard";
import prisma from "../lib/prisma";
import { Post } from "@prisma/client";
import Header from "../components/Header";

export async function getServerSideProps() {
  const posts: Post[] = await prisma.post.findMany({
    include: { media: true },
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}

export default function Index({ posts }) {
  return (
    <div className="mx-auto flex flex-col pt-6">
      <Header />
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10 overflow-hidden pt-6 items-center">
          {posts.map((post) => (
            <PostCard key={post.id} post={post} />
          ))}
        </div>
      </div>
    </div>
  );
}
