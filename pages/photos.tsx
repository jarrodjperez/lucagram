import PhotoCard from "../components/PhotoCard";
import prisma from "../lib/prisma";
import { Media } from "@prisma/client";
import Header from "../components/Header";
import Footer from "../components/Footer";

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
    <div className="container mx-auto">
      <Header />
      <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 gap-2 md:gap-10 overflow-hidden items-center pt-2 pb-16 md:pb-4">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
