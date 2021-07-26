import { getSession, useSession } from "next-auth/client";
import FullPageLoader from "../components/FullPageLoader";

const verify = () => {
  const [loading] = useSession();

  if (loading) {
    return <FullPageLoader />;
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 px-4 sm:px-6 lg:px-8">
      <div className="flex flex-col justify-center items-center max-w-xl w-full space-y-8">
        <h1 className="text-4xl px-2 text-center text-black dark:text-white">
          Check your email
        </h1>
        <h2 className="mt-6 text-center text-2xl text-black dark:text-white">
          A link has been sent to your email address
        </h2>
        <p className="text-black dark:text-white">
          {process.env.NEXT_PUBLIC_NEXTAUTH_URL}
        </p>
      </div>
    </div>
  );
};

verify.getInitialProps = async (context) => {
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
  };
};

export default verify;
