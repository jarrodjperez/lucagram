import Navigation from "./Navigation";
import { UserCircleIcon } from "@heroicons/react/solid";
import Link from "next/link";
import Image from "next/image";
import { signIn, useSession } from "next-auth/client";
import { PlusCircleIcon } from "@heroicons/react/solid";
import useSWR from "swr";
import { fetcher } from "../lib/fetcher";
import { User, Role } from "@prisma/client";

export default function Header() {
  const [session, loading] = useSession();
  const { data: user } = useSWR<User>("/api/me", fetcher);

  if (loading) {
    return null;
  }

  return (
    <header className="flex flex-row px-2 sm:px-0 py-2 sm:py-4 sticky top-0 bg-white dark:bg-dark-gray z-10 border-b dark:border-gray-700 sm:border-0">
      <Navigation />
      <div className="flex items-center justify-end flex-initial cursor-pointer">
        {session ? (
          <>
            {user?.role === "ADMIN" && (
              <Link href="/upload">
                <button className="mr-2 bg-gray-600 dark:bg-white sm:bg-gradient-to-r from-primary to-secondary sm:inline-flex items-center rounded-full sm:px-2 sm:py-1 text-sm leading-4 font-medium sm:rounded-md shadow-sm text-white focus:outline-none focus:ring-2 focus:ring-offset-2">
                  <PlusCircleIcon className="w-6 h-6 dark:text-dark-gray sm:dark:text-white" />
                  <span className="hidden sm:inline-block sm:ml-2">
                    Add photo
                  </span>
                </button>
              </Link>
            )}
            <Link href="/profile">
              <div className="flex items-center justify-center bg-gradient-to-r from-primary to-secondary rounded-full h-7 w-7">
                {session?.user?.image ? (
                  <Image
                    src={session?.user?.image}
                    objectFit="cover"
                    quality="100"
                    width="24px"
                    height="24px"
                    className="rounded-full"
                  />
                ) : (
                  <UserCircleIcon className="w-10 h-10 text-gray-600 dark:text-white bg-white dark:bg-dark-gray rounded-full" />
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
