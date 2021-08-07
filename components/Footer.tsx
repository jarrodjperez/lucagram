import Link from "next/link";
import {
  HomeIcon,
  CameraIcon,
  VideoCameraIcon,
} from "@heroicons/react/outline";
import { useRouter } from "next/router";
import {
  HomeIcon as HomeIconSolid,
  CameraIcon as CameraIconSolid,
  VideoCameraIcon as VideoCameraIconSolid,
} from "@heroicons/react/solid";

export default function Footer() {
  const { pathname } = useRouter();

  return (
    <footer className="z-10 fixed bottom-0 left-0 right-0 flex sm:hidden justify-around items-center bg-white border-t border-t-gray-200 dark:border-transparent dark:bg-light-gray text-gray-600 dark:text-white">
      <Link href="/">
        <a className="cursor-pointer py-1 flex flex-col justify-center items-center">
          {pathname === "/feed" ? (
            <HomeIconSolid className="w-6 h-6" />
          ) : (
            <HomeIcon className="w-6 h-6" />
          )}
          <span className="text-xs">Home</span>
        </a>
      </Link>
      <Link href="/photos">
        <a className="cursor-pointer py-1 flex flex-col justify-center items-center">
          {pathname === "/photos" ? (
            <CameraIconSolid className="w-6 h-6" />
          ) : (
            <CameraIcon className="w-6 h-6" />
          )}
          <span className="text-xs">Photos</span>
        </a>
      </Link>
      <Link href="/videos">
        <a className="cursor-pointer py-1 flex flex-col justify-center items-center">
          {pathname === "/videos" ? (
            <VideoCameraIconSolid className="w-6 h-6" />
          ) : (
            <VideoCameraIcon className="w-6 h-6" />
          )}
          <span className="text-xs">Videos</span>
        </a>
      </Link>
    </footer>
  );
}
