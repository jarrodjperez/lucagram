import React from "react";
import { Media } from "@prisma/client";
interface Props {
  photo: Media;
}

const PhotoCard = ({ photo }: Props) => {
  return (
    <div className="sm:max-w-sm overflow-hidden sm:shadow-lg sm:rounded-lg sm:mx-0">
      <img src={photo.url} alt="" className="w-full object-fit" />
    </div>
  );
};

export default PhotoCard;
