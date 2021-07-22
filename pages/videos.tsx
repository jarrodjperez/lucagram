import VideoCard from "../components/VideoCard";
import prisma from "../lib/prisma";
import { Media } from "@prisma/client";
import Header from "../components/Header";

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
    <div className="mx-auto flex flex-col pt-6">
      <Header />
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10 overflow-hidden pt-6 items-center">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
    </div>
  );
}
