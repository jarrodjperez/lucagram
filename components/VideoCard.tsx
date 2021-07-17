import React from "react";
import { Media } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
SwiperCore.use([Pagination]);

interface Props {
  video: Media;
}

const VideoCard = ({ video }: Props) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class=' ${className} rounded-full bg-white h-1 w-1 inline-flex'></span>`;
    },
  };

  return (
    <div className="w-100 mx-2 md:mx-0 md:max-w-sm overflow-hidden shadow-lg rounded-lg bg-transparent">
      <video controls>
        <source src={video.url} type={video.type} />
      </video>
    </div>
  );
};

export default VideoCard;
