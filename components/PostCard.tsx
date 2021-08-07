import React from "react";
import { Post } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import Image from "next/image";
import SwiperCore, { Pagination } from "swiper/core";
import dayjs from "dayjs";
import { ClockIcon } from "@heroicons/react/outline";
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
    <div className="sm:mx-0 sm:max-w-sm overflow-hidden shadow sm:shadow-md bg-white dark:bg-dark-gray border-b dark:border-gray-700 sm:border-none">
      <div className="flex flex-row items-center p-4">
        {post["author"]["image"] ? (
          <div className="flex items-center justify-center bg-gradient-to-r from-primary to-secondary rounded-full h-6 w-6">
            <Image
              src={post["author"]["image"]}
              objectFit="scale-down"
              quality="100"
              width="20px"
              height="20px"
            />
          </div>
        ) : (
          <span className="h-6 w-6 rounded-full overflow-hidden bg-gray-100">
            <svg
              className="h-full w-full text-gray-300"
              fill="currentColor"
              viewBox="0 0 24 24"
            >
              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
            </svg>
          </span>
        )}
        <span className="text-xs ml-2 font-mono text-gray-600 dark:text-white">
          {post["author"]["name"]}
        </span>
        <span className="flex flex-row justify-end text-xs text-gray-600 dark:text-white flex-grow text-right">
          <ClockIcon className="w-4 h-4 mr-1" />
          {dayjs(new Date(post.createdAt)).format("MMMM DD, YYYY")}
        </span>
      </div>
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
      <div className="text-gray-600 dark:text-white py-6 px-4">
        <p className="text-xs font-mono">{post.description}</p>
      </div>
    </div>
  );
};

export default PostCard;
