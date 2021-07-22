import PhotoCard from "../components/PhotoCard";
import prisma from "../lib/prisma";
import { Media } from "@prisma/client";
import Header from "../components/Header";

export async function getServerSideProps() {
  const photos: Media[] = await prisma.media.findMany({
    where: { type: "image/jpeg" },
  });
  return {
    props: {
      photos: JSON.parse(JSON.stringify(photos)),
    },
  };
}

export default function Photos({ photos }) {
  return (
    <div className="mx-auto flex flex-col pt-6">
      <Header />
      <div className="flex justify-center items-center">
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10 overflow-hidden pt-6 items-center">
          {photos.map((photo) => (
            <PhotoCard key={photo.id} photo={photo} />
          ))}
        </div>
      </div>
    </div>
  );
}
