import VideoCard from "../components/VideoCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import FullPageLoader from "../components/FullPageLoader";

export default function Home() {
  const { data: videos } = useSWR("/api/videos", fetcher);

  if (!videos) return <FullPageLoader />;

  return (
    <div className="container mx-auto">
      <Header />
      <div className="grid grid-cols-3 gap-0 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 sm:gap-10 items-center sm:pt-4 pb-16 sm:pb-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
