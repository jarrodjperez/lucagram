import { signOut, useSession } from "next-auth/client";
import Header from "../components/Header";
import { Prisma } from "@prisma/client";
import { Form, Field } from "react-final-form";
import { useRouter } from "next/router";
import Image from "next/image";
import Footer from "../components/Footer";
import toast from "react-hot-toast";
import { useState } from "react";
import { useDropzone } from "react-dropzone";
import { useS3Upload } from "next-s3-upload";

export default function Profile() {
  const [session, loading] = useSession();
  const router = useRouter();
  const [saving, setSaving] = useState(false);
  const { uploadToS3 } = useS3Upload();
  const [image, setImage] = useState("");
  const { getInputProps, open } = useDropzone({
    noClick: true,
    noKeyboard: true,
    maxFiles: 1,
    accept: "image/*",
    onDrop: async (acceptedFiles) => {
      const s3Urls = await Promise.all(
        acceptedFiles.map(async (file) => {
          const { url } = await uploadToS3(file);
          return url;
        })
      );

      setImage(s3Urls[0]);
    },
  });

  if (!loading && !session) {
    router.push("/signin");
  }

  if (loading) {
    return (
      <div className="flex h-screen">
        <div className="m-auto">Loading...</div>
      </div>
    );
  }

  const onSubmit = async (values: Prisma.UserUpdateInput) => {
    setSaving(true);
    const response = await toast.promise(
      fetch("/api/profile", {
        method: "PUT",
        body: JSON.stringify({ ...values, image }),
      }),
      {
        loading: "Saving profile...",
        success: "Successfully saved!",
        error: "Could not save :(",
      }
    );

    if (!response.ok) {
      throw new Error(response.statusText);
    }

    setSaving(false);
    return await response.json();
  };

  return (
    <div className="container mx-auto">
      <Header />
      <div className="w-full max-w-4xl mx-auto mt-4 p-6 lg:p-8 dark:bg-light-gray">
        <Form
          onSubmit={onSubmit}
          initialValues={{
            name: session?.user?.name,
          }}
          render={({ handleSubmit, submitting, pristine }) => (
            <form
              className="space-y-8 divide-y divide-gray-200 dark:divide-white"
              onSubmit={handleSubmit}
            >
              <div className="space-y-8 divide-y divide-gray-200 dark:divide-white">
                <div className="grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-bold text-black dark:text-white"
                    >
                      Email
                    </label>
                    <span className="text-black text-sm dark:text-white">
                      {session?.user?.email}
                    </span>
                    <button
                      type="button"
                      onClick={() => signOut()}
                      className="bg-gradient-to-r from-primary to-secondary text-white ml-5 py-2 px-3 rounded-md shadow-sm text-sm leading-4 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                    >
                      Sign out
                    </button>
                  </div>

                  <div className="sm:col-span-3">
                    <label
                      htmlFor="name"
                      className="block text-sm font-bold text-black dark:text-white mb-2"
                    >
                      Name
                    </label>
                    <Field
                      name="name"
                      component="input"
                      type="text"
                      className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                      placeholder="Name"
                    />
                  </div>

                  <div className="sm:col-span-6">
                    <label
                      htmlFor="photo"
                      className="block text-sm font-bold text-black dark:text-white"
                    >
                      Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      <input {...getInputProps()} />
                      {image || session?.user?.image ? (
                        <Image
                          src={image || session?.user?.image}
                          objectFit="cover"
                          quality="100"
                          width="48px"
                          height="48px"
                          className="rounded-full"
                        />
                      ) : (
                        <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                          <svg
                            className="h-full w-full text-gray-300"
                            fill="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                          </svg>
                        </span>
                      )}
                      <button
                        type="button"
                        onClick={open}
                        className="bg-gradient-to-r from-primary to-secondary text-white ml-5 py-2 px-3 rounded-md shadow-sm text-sm leading-4 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                      >
                        Change
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="pt-5 ">
                <div className="flex justify-end">
                  <button
                    type="submit"
                    disabled={submitting}
                    className=" w-full flex justify-center bg-gradient-to-r from-primary to-secondary text-white py-2 px-3 rounded-md shadow-sm text-sm leading-4 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    {saving ? (
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
                      <>Save</>
                    )}
                  </button>
                </div>
              </div>
            </form>
          )}
        />
      </div>
      <Footer />
    </div>
  );
}
