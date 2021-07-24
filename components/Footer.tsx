import Link from "next/link";
import { HomeIcon, PhotographIcon, FilmIcon } from "@heroicons/react/outline";
import { UserCircleIcon } from "@heroicons/react/solid";
import clsx from "clsx";
import { useRouter } from "next/router";
import { PlusCircleIcon } from "@heroicons/react/solid";
import { User, Role } from "@prisma/client";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";

export default function Footer() {
  const { pathname } = useRouter();
  const { data: user, error } = useSWR<User>("/api/me", fetcher);

  return (
    <footer className="z-10 fixed bottom-0 left-0 right-0 py-4 flex md:hidden justify-around items-center bg-white dark:bg-light-gray rounded-t-lg">
      {user?.role === Role.ADMIN && (
        <button className="fixed p-2 bottom-6 bg-white dark:bg-light-gray inline-flex items-center rounded-full text-sm focus:outline-none focus:ring-2 focus:ring-offset-2">
          <PlusCircleIcon className="w-12 h-12 dark:text-white text-secondary" />
        </button>
      )}
      <Link href="/">
        <a>
          <HomeIcon
            className={clsx(
              "w-6 h-6  cursor-pointer text-black dark:text-white",
              pathname === "/feed" && "text-primary dark:text-secondary"
            )}
          />
        </a>
      </Link>
      <Link href="/photos">
        <a>
          <PhotographIcon
            className={clsx(
              "w-6 h-6  cursor-pointer text-black dark:text-white",
              pathname === "/photos" && "text-primary dark:text-secondary"
            )}
          />
        </a>
      </Link>
      <Link href="/videos">
        <a>
          <FilmIcon
            className={clsx(
              "w-6 h-6  cursor-pointer text-black dark:text-white",
              pathname === "/videos" && "text-primary dark:text-secondary"
            )}
          />
        </a>
      </Link>
      <Link href="/profile">
        <a>
          <UserCircleIcon
            className={clsx(
              "w-6 h-6  cursor-pointer text-black dark:text-white",
              pathname === "/profile" && "text-primary dark:text-secondary"
            )}
          />
        </a>
      </Link>
    </footer>
  );
}
