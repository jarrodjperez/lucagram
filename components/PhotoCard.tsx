import React from "react";
import { Media } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
SwiperCore.use([Pagination]);

interface Props {
  photo: Media;
}

const PhotoCard = ({ photo }: Props) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class=' ${className} rounded-full bg-white h-1 w-1 inline-flex'></span>`;
    },
  };

  return (
    <div className="w-100 mx-2 md:mx-0 md:max-w-sm overflow-hidden shadow-lg rounded-lg bg-transparent">
      {/* <Swiper pagination={pagination}> */}

      {/* <SwiperSlide> */}

      <img
        src={photo.url}
        alt=""
        className="w-full h-96 object-cover rounded-lg"
      />

      {/* </SwiperSlide> */}

      {/* </Swiper> */}
    </div>
  );
};

export default PhotoCard;
