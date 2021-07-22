import Link from "next/link";
import { useRouter } from "next/router";
import clsx from "clsx";
import { useSession } from "next-auth/client";

export default function Navigation() {
  const { pathname } = useRouter();
  const [session] = useSession();

  return (
    <nav>
      <h2 className="hidden md:block border-b border-gray-200 leading-hl w-full text-center my-10">
        <span className="bg-white px-4">
          <Link href="/">
            <span
              className={clsx(
                "hover:text-gray-600 cursor-pointer px-6 text-gray-400",
                pathname === "/" && "text-red-400"
              )}
            >
              Feed
            </span>
          </Link>
          <Link href="/photos">
            <span
              className={clsx(
                "hover:text-gray-600 cursor-pointer px-6 text-gray-400",
                pathname === "/photos" && "text-red-400"
              )}
            >
              Photos
            </span>
          </Link>
          <Link href="/videos">
            <span
              className={clsx(
                "hover:text-gray-600 cursor-pointer px-6 text-gray-400",
                pathname === "/videos" && "text-red-400"
              )}
            >
              Videos
            </span>
          </Link>
          {session ? (
            <Link href="/profile">
              <span
                className={clsx(
                  "hover:text-gray-600 cursor-pointer px-6 text-gray-400",
                  pathname === "/profile" && "text-red-400"
                )}
              >
                Profile
              </span>
            </Link>
          ) : (
            <Link href="/signin">
              <span className="hover:text-gray-600 cursor-pointer px-6 text-gray-400">
                Sign in
              </span>
            </Link>
          )}
        </span>
      </h2>
    </nav>
  );
}
