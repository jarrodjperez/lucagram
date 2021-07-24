import React from "react";
import { Media } from "@prisma/client";
interface Props {
  photo: Media;
}

const PhotoCard = ({ photo }: Props) => {
  return (
    <div className="w-100 mx-2 md:mx-0 md:max-w-sm overflow-hidden shadow-lg rounded-sm">
      <img src={photo.url} alt="" className="w-full h-60 object-cover" />
    </div>
  );
};

export default PhotoCard;
