import Link from "next/link";
import { HomeIcon, PhotographIcon, FilmIcon } from "@heroicons/react/outline";
import clsx from "clsx";
import { useRouter } from "next/router";

export default function Footer() {
  const { pathname } = useRouter();

  return (
    <footer className="z-10 fixed bottom-0 left-0 right-0 py-4 flex md:hidden justify-around items-center bg-white dark:bg-light-gray">
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
    </footer>
  );
}
