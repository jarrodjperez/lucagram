import { csrfToken, getSession, useSession } from "next-auth/client";
import { LockClosedIcon } from "@heroicons/react/solid";
import FullPageLoader from "../components/FullPageLoader";

const signin = ({ csrfToken }) => {
  const [loading] = useSession();

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-md w-full space-y-8">
        <div>
          <h1 className="text-6xl px-2 font-logo text-center text-black dark:text-white">
            Lucagram
          </h1>
          <h2 className="mt-6 text-center text-2xl text-black dark:text-white">
            Sign in to your account
          </h2>
        </div>
        <form
          className="mt-8 space-y-6"
          action="/api/auth/signin/email"
          method="POST"
        >
          <input name="csrfToken" type="hidden" defaultValue={csrfToken} />
          <div className="rounded-md shadow-sm -space-y-px">
            <div>
              <label htmlFor="email-address" className="sr-only">
                Email address
              </label>
              <input
                id="email"
                name="email"
                type="email"
                autoComplete="email"
                required
                className="appearance-none rounded-none relative block w-full px-3 py-2 border border-gray-300 placeholder-gray-500 text-gray-900 rounded-t-md focus:outline-none focus:z-10 sm:text-sm"
                placeholder="Email address"
              />
            </div>
          </div>
          <div>
            <button
              type="submit"
              className="group bg-gradient-to-r from-primary to-secondary text-white relative w-full flex justify-center py-2 px-4 rounded-md shadow-sm text-sm font-medium focus:outline-none focus:ring-2 focus:ring-offset-2"
            >
              <span className="absolute left-0 inset-y-0 flex items-center pl-3">
                <LockClosedIcon
                  className="h-5 w-5 text-white"
                  aria-hidden="true"
                />
              </span>
              Sign in
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

signin.getInitialProps = async (context) => {
  const { req, res } = context;
  const session = await getSession({ req });

  if (session && res && session.accessToken) {
    res.writeHead(302, {
      Location: "/",
    });
    res.end();
    return;
  }

  return {
    session: undefined,
    csrfToken: await csrfToken(context),
  };
};

export default signin;
