import { useState } from "react";
import { useS3Upload, getImageData } from "next-s3-upload";
import Image from "next/image";
import { Prisma } from "@prisma/client";

async function savePost(post: Prisma.PostCreateInput) {
  const response = await fetch("/api/posts", {
    method: "POST",
    body: JSON.stringify(post),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

async function savePhoto(photo: Prisma.MediaCreateInput) {
  const response = await fetch("/api/photos", {
    method: "POST",
    body: JSON.stringify(photo),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }
  return await response.json();
}

export default function UploadTest() {
  const [imageUrl, setImageUrl] = useState<string>();
  const [height, setHeight] = useState<number>();
  const [width, setWidth] = useState<number>();
  const { FileInput, openFileDialog, uploadToS3 } = useS3Upload();

  let handleFileChange = async (file) => {
    const { url } = await uploadToS3(file);

    if (file.type.includes("image/")) {
      const { height, width } = await getImageData(file);
      setWidth(width);
      setHeight(height);
    }

    setImageUrl(url);

    // Do this in another function
    const photo = await savePhoto({
      url,
      type: file.type,
    });

    // const post = await savePost({
    //   media: [url],
    //   description: "lorem ipsum foobar",
    // });
  };

  return (
    <div
      className="flex flex-col justify-center items-center h-screen"
      onDrop={openFileDialog}
    >
      <FileInput onChange={handleFileChange} />
      <button
        onClick={openFileDialog}
        type="button"
        className="inline-flex items-center px-6 py-3 border border-transparent text-base font-medium rounded-md shadow-sm text-white focus:ring-indigo-500 bg-gradient-to-tr from-pink-500 via-red-500 to-yellow-500 focus:outline-none focus:ring-2 focus:ring-offset-2"
      >
        Upload photo
      </button>

      {imageUrl && (
        <div className="w-96 h-96">
          <Image src={imageUrl} layout="fill" objectFit="none" quality={100} />
        </div>
      )}
    </div>
  );
}
