import Navigation from "./Navigation";
import { UserCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/client";
import { PlusCircleIcon } from "@heroicons/react/solid";

export default function Header() {
  const [session, loading] = useSession();

  if (loading) {
    return null;
  }

  return (
    <header className="flex flex-row px-2 md:px-0 py-4 sticky top-0 bg-white dark:bg-dark-gray z-10 drop-shadow-lg md:drop-shadow-none">
      <Link href="/">
        <h1 className="text-4xl px-2 font-logo text-black font-bold dark:text-white md:flex-initial flex-grow cursor-pointer">
          Lucagram
        </h1>
      </Link>
      <Navigation />
      <div className="flex items-center justify-end flex-initial cursor-pointer">
        {session ? (
          <>
            <Link href="/upload">
              <button className="mr-2 bg-gradient-to-r from-primary to-secondary inline-flex items-center rounded-full md:px-3 md:py-2 text-sm leading-4 font-medium md:rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                <PlusCircleIcon className="w-6 h-6 dark:text-dark-gray md:dark:text-white" />
                <span className="hidden md:inline-block md:ml-2">
                  Add photo
                </span>
              </button>
            </Link>
            <Link href="/profile">
              <div className="flex items-center justify-center">
                {session?.user?.image ? (
                  <Image
                    src={session?.user?.image}
                    objectFit="scale-down"
                    quality="100"
                    width="40px"
                    height="40px"
                  />
                ) : (
                  <UserCircleIcon className="w-10 h-10 text-black dark:text-white bg-white dark:bg-dark-gray rounded-full" />
                )}
              </div>
            </Link>
          </>
        ) : (
          <button
            onClick={() => signIn()}
            className="bg-gradient-to-r from-primary to-secondary inline-flex items-center px-3 py-2 text-sm leading-4 font-medium rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2"
          >
            Sign in
          </button>
        )}
      </div>
    </header>
  );
}
