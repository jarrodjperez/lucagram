import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useSession } from "next-auth/client";

export default function Navigation() {
  const { pathname } = useRouter();
  const [session] = useSession();

  return (
    <div className="flex flex-grow">
      <Link href="/">
        <div className="flex flex-col items-center justify-center">
          <h1 className="text-3xl px-2 font-logo text-black font-bold dark:text-white sm:flex-initial flex-grow cursor-pointer">
            Lucagram
          </h1>
        </div>
      </Link>
      <div className="hidden justify-center sm:ml-6 sm:flex sm:space-x-8">
        <Link href="/feed">
          <a
            className={clsx(
              "cursor-pointer text-gray-600 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent",
              pathname === "/feed"
                ? "border-gray-500 dark:border-white"
                : "hover:border-gray-300 dark:hover:border-gray-700"
            )}
          >
            Feed
          </a>
        </Link>
        <Link href="/photos">
          <a
            className={clsx(
              "cursor-pointer text-gray-600 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent",
              pathname === "/photos"
                ? "border-gray-500 dark:border-white"
                : "hover:border-gray-300 dark:hover:border-gray-700"
            )}
          >
            Photos
          </a>
        </Link>
        <Link href="/videos">
          <a
            className={clsx(
              "cursor-pointer text-gray-600 dark:text-white inline-flex items-center px-1 pt-1 text-sm font-medium border-b-2 border-transparent",
              pathname === "/videos"
                ? "border-gray-500 dark:border-white"
                : "hover:border-gray-300 dark:hover:border-gray-700"
            )}
          >
            Videos
          </a>
        </Link>
      </div>
    </div>
  );
}
