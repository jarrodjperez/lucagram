import PhotoCard from "../components/PhotoCard";
import Header from "../components/Header";
import Footer from "../components/Footer";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function Photos() {
  const { data: photos, error } = useSWR("/api/photos", fetcher);

  if (!photos) return null;

  return (
    <div className="container mx-auto">
      <Header />
      <div className="grid grid-cols-3 gap-0 sm:grid-cols-2 md:grid-cols-2 lg:grid-cols-4 md:gap-10 items-center md:pt-4 pb-16 md:pb-4">
        {photos.map((photo) => (
          <PhotoCard key={photo.id} photo={photo} />
        ))}
      </div>
      <Footer />
    </div>
  );
}
