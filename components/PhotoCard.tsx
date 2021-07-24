import React from "react";
import { Media } from "@prisma/client";
interface Props {
  photo: Media;
}

const PhotoCard = ({ photo }: Props) => {
  return (
    <div className="md:max-w-sm overflow-hidden md:shadow-lg md:rounded-lg md:mx-0">
      <img src={photo.url} alt="" className="w-full object-fit" />
    </div>
  );
};

export default PhotoCard;
