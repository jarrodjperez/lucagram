import PostCard from "../components/PostCard";
import prisma from "../lib/prisma";
import { Post } from "@prisma/client";
import Header from "../components/Header";
import Footer from "../components/Footer";

export async function getServerSideProps() {
  const posts: Post[] = await prisma.post.findMany({
    include: { media: true, author: true },
  });
  return {
    props: {
      posts: JSON.parse(JSON.stringify(posts)),
    },
  };
}

export default function Feed({ posts }) {
  return (
    <div className="md:container mx-auto relative">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10 overflow-hidden items-center pt-2 pb-16 md:pb-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
