"use client";
import Image from "next/image";
import { useRouter } from "next/navigation";
import logo from "./images/logo.svg";

const Logo = () => {
  const router = useRouter();
  return (
    <Image
      src={logo}
      alt="house hunter logo"
      onClick={() => router.push("/")}
      className=" w-28 cursor-pointer md:w-36 lg:w-52"
    />
  );
};

export default Logo;
