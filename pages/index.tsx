import { useRouter } from "next/router";
import { useEffect } from "react";
import FullPageLoader from "../components/FullPageLoader";

export default function Index() {
  const router = useRouter();
  useEffect(() => {
    router.push("/feed");
  }, []);

  return <FullPageLoader />;
}
