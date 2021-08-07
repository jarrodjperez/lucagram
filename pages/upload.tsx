import { useState } from "react";
import { useS3Upload } from "next-s3-upload";
import { Prisma, Role, User } from "@prisma/client";
import { useDropzone } from "react-dropzone";
import Header from "../components/Header";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { useEffect } from "react";
import { useRouter } from "next/router";
import Footer from "../components/Footer";
import toast from "react-hot-toast";

export default function UploadTest() {
  const router = useRouter();
  const { uploadToS3 } = useS3Upload();
  const [files, setFiles] = useState<Array<Prisma.MediaCreateInput>>([]);
  const [loading, setLoading] = useState(false);
  const [description, setDescription] = useState("");
  const { data: user, error } = useSWR<User>("/api/me", fetcher);
  const { getRootProps, getInputProps } = useDropzone({
    accept: "image/*, video/*",
    onDrop: async (acceptedFiles) => {
      setLoading(true);
      const s3Urls = await Promise.all(
        acceptedFiles.map(async (file) => {
          const { url } = await uploadToS3(file);
          return { url, type: file.type };
        })
      );

      setFiles(s3Urls);
      setLoading(false);
    },
  });

  useEffect(() => {
    if (user?.role === Role.USER) {
      router.push("/feed");
    }
  }, [user]);

  if (!user || user?.role === Role.USER) {
    return <>Loading</>;
  }

  async function savePost() {
    setLoading(true);

    // Get user
    const userResponse = await fetch("/api/me");
    if (!userResponse.ok) {
      throw new Error(userResponse.statusText);
    }
    const user = await userResponse.json();

    // Save media
    const mediaResponse = await fetch("/api/media", {
      method: "POST",
      body: JSON.stringify(files),
    });
    if (!mediaResponse.ok) {
      throw new Error(mediaResponse.statusText);
    }
    const media = await mediaResponse.json();

    // Save post with media and user
    const post = await fetch("/api/posts", {
      method: "POST",
      body: JSON.stringify({
        description,
        author: {
          connect: {
            id: user?.id,
          },
        },
        media: {
          connect: media,
        },
      }),
    });
    if (!post.ok) {
      throw new Error(post.statusText);
    }

    setLoading(false);
    setFiles([]);
    setDescription("");
    return await post.json();
  }

  const thumbs = files.map((file) => {
    return (
      <div
        className="flex w-40 sm:w-72 h-full m-2 p-1 justify-center items-center shadow-xl"
        key={file.url}
      >
        <div className="flex overflow-hidden">
          {file.type.includes("video/") ? (
            <video controls>
              <source src={file.url} type={file.type} />
            </video>
          ) : (
            <img src={file.url} className="block w-auto h-full" />
          )}
        </div>
      </div>
    );
  });

  return (
    <section className="container mx-auto">
      <Header />
      <div className="flex flex-col max-w-6xl mx-auto pb-20 sm:pb-0">
        <div className="flex flex-col flex-grow w-full p-2">
          <label className="text-gray-600 dark:text-white mb-2">Upload</label>
          <div
            {...getRootProps({ className: "dropzone h-12 w-12" })}
            className="flex flex-col items-center border-2 border-gray-300 border-dashed rounded-sm p-10"
          >
            <input {...getInputProps()} />
            <svg
              className="mx-auto h-12 w-12 text-gray-400"
              stroke="currentColor"
              fill="none"
              viewBox="0 0 48 48"
              aria-hidden="true"
            >
              <path
                d="M28 8H12a4 4 0 00-4 4v20m32-12v8m0 0v8a4 4 0 01-4 4H12a4 4 0 01-4-4v-4m32-4l-3.172-3.172a4 4 0 00-5.656 0L28 28M8 32l9.172-9.172a4 4 0 015.656 0L28 28m0 0l4 4m4-24h8m-4-4v8m-12 4h.02"
                strokeWidth={2}
                strokeLinecap="round"
                strokeLinejoin="round"
              />
            </svg>
            <p className="text-gray-600 dark:text-white text-center">
              Drag 'n' drop some files here, or click to select files
            </p>
          </div>
        </div>
        <div className="grid grid-cols-2 px-2 mt-6">
          <label
            className="text-gray-600 dark:text-white mb-2"
            htmlFor="description"
          >
            Description
          </label>
          <textarea
            id="description"
            name="description"
            rows={4}
            defaultValue={description}
            onChange={(e) => setDescription(e.target.value)}
            className="col-span-2 border border-gray-300"
          />
        </div>
        <label className="flex w-full p-2 mt-6 text-gray-600 dark:text-white mb-2">
          Media
        </label>
        {!files.length && (
          <div className="flex flex-col justify-center items-center h-24 text-gray-600 dark:text-white text-center">
            No media uploaded
          </div>
        )}
        <div className="flex flex-row flex-wrap justify-between items-center">
          {thumbs}
        </div>
        <div className="flex w-full p-2">
          <button
            disabled={!files.length || loading}
            onClick={() =>
              toast.promise(savePost(), {
                loading: "Saving post...",
                success: "Successfull saved!",
                error: "Could not save :(",
              })
            }
            type="button"
            className="flex-grow group bg-gradient-to-r from-primary to-secondary text-white relative w-full flex justify-center py-2 px-4 rounded-sm shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            {loading ? (
              <svg
                className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                xmlns="http://www.w3.org/2000/svg"
                fill="none"
                viewBox="0 0 24 24"
              >
                <circle
                  className="opacity-25"
                  cx="12"
                  cy="12"
                  r="10"
                  stroke="currentColor"
                  stroke-width="4"
                ></circle>
                <path
                  className="opacity-75"
                  fill="currentColor"
                  d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                ></path>
              </svg>
            ) : (
              <>Post</>
            )}
          </button>
        </div>
      </div>
      <Footer />
    </section>
  );
}
