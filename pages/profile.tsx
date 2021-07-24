import { signOut, useSession } from "next-auth/client";
import Header from "../components/Header";
import { Prisma } from "@prisma/client";
import { Form, Field } from "react-final-form";
import { useRouter } from "next/router";
import Image from "next/image";
import Footer from "../components/Footer";

const onSubmit = async (values: Prisma.UserUpdateInput) => {
  const response = await fetch("/api/profile", {
    method: "PUT",
    body: JSON.stringify(values),
  });

  if (!response.ok) {
    throw new Error(response.statusText);
  }

  return await response.json();
};

export default function Profile() {
  const [session, loading] = useSession();
  const router = useRouter();

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

  return (
    <div className="container mx-auto">
      <Header />
      <div className="w-full max-w-4xl mx-auto mt-4 p-4 sm:p-6 lg:p-8 dark:bg-light-gray">
        <Form
          onSubmit={onSubmit}
          initialValues={{
            name: session?.user?.name,
            image: session?.user?.image,
          }}
          render={({ handleSubmit, submitting, pristine }) => (
            <form
              className="space-y-8 divide-y divide-gray-200 dark:divide-white"
              onSubmit={handleSubmit}
            >
              <div className="space-y-8 divide-y divide-gray-200 dark:divide-white">
                <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                  <div className="sm:col-span-6">
                    <label
                      htmlFor="email"
                      className="block text-sm font-medium text-black dark:text-white"
                    >
                      Email
                    </label>
                    <span className="text-black dark:text-white">
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
                      className="block text-sm font-medium text-black dark:text-white"
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
                      className="block text-sm font-medium text-black dark:text-white"
                    >
                      Photo
                    </label>
                    <div className="mt-1 flex items-center">
                      {false ? (
                        <Image
                          src={session?.user?.image}
                          objectFit="scale-down"
                          quality="100"
                          width="48px"
                          height="48px"
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
                    disabled={pristine || submitting}
                    className="bg-gradient-to-r from-primary to-secondary text-white ml-5 py-2 px-3 rounded-md shadow-sm text-sm leading-4 font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
                  >
                    Save
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
