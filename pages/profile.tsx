import { getSession, signOut, useSession } from "next-auth/client";
import Header from "../components/Header";
import { Prisma } from "@prisma/client";
import { Form, Field } from "react-final-form";
import { useRouter } from "next/router";

Profile.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (!session) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session,
  };
};

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

  if (!session) {
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
    <div className="mx-auto flex flex-col pt-6">
      <Header />
      <div className="w-full max-w-6xl mx-auto py-12 px-4 sm:px-6 lg:px-8">
        <div className="max-w-3xl mx-auto">
          <Form
            onSubmit={onSubmit}
            initialValues={{
              name: session?.user?.name,
              image: session?.user?.image,
            }}
            render={({ handleSubmit, submitting, pristine }) => (
              <form
                className="space-y-8 divide-y divide-gray-200 max-w-6xl"
                onSubmit={handleSubmit}
              >
                <div className="space-y-8 divide-y divide-gray-200 max-w-7xl">
                  <div>
                    <div className="mt-6 grid grid-cols-1 gap-y-6 gap-x-4 sm:grid-cols-6">
                      <div className="sm:col-span-6">
                        <label
                          htmlFor="email"
                          className="block text-sm font-medium text-gray-700"
                        >
                          Email
                        </label>
                        <span>{session?.user?.email}</span>
                        <button
                          type="button"
                          onClick={() => signOut()}
                          className="ml-6 bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                        >
                          Sign out
                        </button>
                      </div>

                      <div className="sm:col-span-6">
                        <label
                          htmlFor="name"
                          className="block text-sm font-medium text-gray-700"
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
                          className="block text-sm font-medium text-gray-700"
                        >
                          Photo
                        </label>
                        <div className="mt-1 flex items-center">
                          <span className="h-12 w-12 rounded-full overflow-hidden bg-gray-100">
                            <svg
                              className="h-full w-full text-gray-300"
                              fill="currentColor"
                              viewBox="0 0 24 24"
                            >
                              <path d="M24 20.993V24H0v-2.996A14.977 14.977 0 0112.004 15c4.904 0 9.26 2.354 11.996 5.993zM16.002 8.999a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                          </span>
                          <button
                            type="button"
                            className="ml-5 bg-white py-2 px-3 border border-gray-300 rounded-md shadow-sm text-sm leading-4 font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                          >
                            Change
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="pt-5 ">
                  <div className="flex justify-end">
                    <button
                      type="submit"
                      disabled={pristine || submitting}
                      className="bg-white py-2 px-4 border border-gray-300 rounded-md shadow-sm text-sm font-medium text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                    >
                      Save
                    </button>
                  </div>
                </div>
              </form>
            )}
          />
        </div>
      </div>
    </div>
  );
}
