import React from "react";
import { Media } from "@prisma/client";
interface Props {
  video: Media;
}

const VideoCard = ({ video }: Props) => {
  return (
    <div className="md:max-w-sm overflow-hidden md:shadow-lg md:rounded-lg md:mx-0">
      <video className="w-full object-fit" controls>
        <source src={video.url} type={video.type} />
      </video>
    </div>
  );
};

export default VideoCard;
