import PostCard from "../components/PostCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function Feed() {
  const { data: posts, error } = useSWR("/api/posts", fetcher);

  if (!posts) return null;

  return (
    <div className="md:container mx-auto relative">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-4 md:gap-10 overflow-hidden items-center pt-2 pb-16 md:pb-4">
        {posts.map((post) => (
          <PostCard key={post.id} post={post} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
