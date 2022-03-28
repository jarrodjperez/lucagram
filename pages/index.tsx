import { useRouter } from "next/router";
import { useEffect } from "react";
import useSWR from "swr";
import Footer from "../components/Footer";
import FullPageLoader from "../components/FullPageLoader";
import Header from "../components/Header";
import PostCard from "../components/PostCard";
import { fetcher } from "../lib/fetcher";

export default function Index() {
  const { data: posts } = useSWR("/api/posts", fetcher);

  if (!posts) return <FullPageLoader />;

  return (
    <div className="sm:container mx-auto relative">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-10 overflow-hidden items-center pb-12 sm:pb-4 pt-0 sm:pt-2">
        {posts && posts.map((post) => <PostCard key={post.id} post={post} />)}
      </div>
      <Footer />
    </div>
  );
}
