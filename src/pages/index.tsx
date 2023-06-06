import Image from "next/image";
import { Inter } from "next/font/google";
import { useRouter } from "next/router";
import { handleLogout } from "../../utils/auth/logout";
import Navbar from "../../components/Navbar/Navbar";
import { useEffect } from "react";
import { getCookie } from "../../utils/cookies";
import useUserStore from "../../store/userStore";
import AddPost from "../../components/AddPost/AddPost";
import Head from "next/head";

const inter = Inter({ subsets: ["latin"] });

export default function Home() {
  const router = useRouter();
  const clearUser = useUserStore((state) => state.clearUser);

  useEffect(() => {
    const token = getCookie("jw-token");

    if (!token) {
      router.push("/login");
    }
  }, []);

  return (
    <>
      <Head>
        <title>Light</title>
      </Head>
      <div className="bg-neutral">
        <div className="lg:max-w-screen-lg lg:mx-auto bg-neutral py-10">
          <AddPost />
        </div>
      </div>
    </>
  );
}
