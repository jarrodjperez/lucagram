import VideoCard from "../components/VideoCard";
import prisma from "../lib/prisma";
import { Media } from "@prisma/client";
import Header from "../components/Header";
import Footer from "../components/Footer";

export async function getServerSideProps() {
  const videos: Media[] = await prisma.media.findMany({
    where: { type: "video/mp4" },
  });
  return {
    props: {
      videos: JSON.parse(JSON.stringify(videos)),
    },
  };
}

export default function Home({ videos }) {
  return (
    <div className="container mx-auto">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10 overflow-hidden items-center pt-2 pb-16 md:pb-4">
        {videos.map((video) => (
          <VideoCard key={video.id} video={video} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
