import React from "react";
import { Post } from "@prisma/client";
import { Swiper, SwiperSlide } from "swiper/react";
import SwiperCore, { Pagination } from "swiper/core";
SwiperCore.use([Pagination]);

interface Props {
  post: Post;
}

const PostCard = ({ post }: Props) => {
  const pagination = {
    clickable: true,
    renderBullet: function (index, className) {
      return `<span class=' ${className} rounded-full bg-white h-1 w-1 inline-flex'></span>`;
    },
  };

  return (
    <div className="w-100 mx-2 md:mx-0 md:max-w-sm overflow-hidden shadow-lg rounded-lg bg-transparent">
      {post.title}
      {post.description}
      <Swiper pagination={pagination}>
        {post["media"].map((media) => (
          <SwiperSlide>
            {media.type.includes("video/") ? (
              <video controls>
                <source src={media.url} type={media.type} />
              </video>
            ) : (
              <img
                src={media.url}
                alt=""
                className="w-full h-96 object-cover rounded-lg"
              />
            )}
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
};

export default PostCard;
