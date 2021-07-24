import React from "react";
import { Media } from "@prisma/client";
interface Props {
  video: Media;
}

const VideoCard = ({ video }: Props) => {
  return (
    <div className="w-100 mx-2 md:mx-0 md:max-w-sm overflow-hidden shadow-lg rounded-sm">
      <video className="w-full h-60 object-cover" controls>
        <source src={video.url} type={video.type} />
      </video>
    </div>
  );
};

export default VideoCard;
