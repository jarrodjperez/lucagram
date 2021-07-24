import React from "react";
import { Post } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import SwiperCore, { Pagination } from "swiper/core";
SwiperCore.use([Pagination]);

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class=' ${className} bg-white h-1 w-1 inline-flex'></span>`;
    },
  };

  return (
    <div className="mx-2 md:mx-0 md:max-w-sm overflow-hidden shadow-lg rounded-sm bg-white dark:bg-light-gray">
      <Swiper pagination={pagination}>
        {post["media"].map((media) => (
          <SwiperSlide key={media.id}>
            {media.type.includes("video/") ? (
              <video className="w-full h-60 object-cover" controls>
                <source src={media.url} type={media.type} />
              </video>
            ) : (
              <img
                src={media.url}
                alt=""
                className="w-full h-60 object-cover"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
      <div className="text-black dark:text-white p-4 ">
        <div className="flex flex-row items-center mb-2">
          <Image
            src={post["author"]["image"]}
            objectFit="scale-down"
            quality="100"
            width="24px"
            height="24px"
          />
          <span className="text-sm ml-2 text-primary dark:text-secondary">
            {post["author"]["name"]}
          </span>
        </div>
        <p className="text-sm">{post.description}</p>
      </div>
    </div>
  );
};

export default PostCard;
