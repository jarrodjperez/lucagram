import { useState } from "react";
import VideoCard from "../components/VideoCard";
import { ChevronDoubleDownIcon } from "@heroicons/react/outline";
import Link from "next/link";
import prisma from "../lib/prisma";
import { Post, Media } from "@prisma/client";

export async function getServerSideProps() {
  const videos: Media[] = await prisma.media.findMany({
    where: { type: "video/mp4" },
  });
  const posts: Post[] = await prisma.post.findMany({
    include: { media: true },
  });
  return {
    props: {
      initialVideos: JSON.parse(JSON.stringify(videos)),
    },
  };
}

export default function Home({ initialVideos }) {
  const [videos, setVideos] = useState<Media[]>(initialVideos);

  return (
    <div className="mx-auto flex flex-col pt-6">
      <h1 className="text-5xl px-2 font-logo text-center">Lucagram</h1>
      <h2 className="hidden md:block border-b border-gray-200 leading-hl w-full text-center my-10">
        <span className="bg-white px-4">
          <span className="hover:text-gray-600 cursor-pointer px-4 text-gray-400 font-bold">
            Feed
          </span>
          <Link href="/">
            <span className="hover:text-gray-600 cursor-pointer px-4 text-gray-400 font-bold">
              Photos
            </span>
          </Link>
          <span className="hover:text-gray-600 cursor-pointer px-4 text-red-400 font-bold">
            Videos
          </span>
          <Link href="/upload">
            <span className="hover:text-gray-600 cursor-pointer px-4 text-gray-400 font-bold">
              Upload
            </span>
          </Link>
        </span>
      </h2>
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10 overflow-hidden pt-6 items-center">
          {videos.map((video) => (
            <VideoCard key={video.id} video={video} />
          ))}
        </div>
      </div>
      <div className="text-center mt-8 fixed bottom-2 w-full">
        <ChevronDoubleDownIcon className="animate-bounce h-10 w-10 m-auto mb-1 text-gray-600" />
        <span className="text-gray-400 text-sm font-bold">
          Scroll down to see more
        </span>
      </div>
    </div>
  );
}
