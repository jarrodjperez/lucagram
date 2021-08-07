import React from "react";
import { Media } from "@prisma/client";
interface Props {
  video: Media;
}

const VideoCard = ({ video }: Props) => {
  return (
    <div className="sm:max-w-sm overflow-hidden sm:shadow-lg sm:rounded-lg sm:mx-0">
      <video className="w-full object-fit" controls>
        <source src={video.url} type={video.type} />
      </video>
    </div>
  );
};

export default VideoCard;
