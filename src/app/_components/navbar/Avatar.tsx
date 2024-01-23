import Image from "next/image";
const Avatar = (props: { src?: string }) => {
  return (
    <Image
      src={props.src ?? "/images/placeholder.jpg"}
      alt="User Profile Photo"
      height={30}
      width={30}
      className="rounded-full"
    />
  );
};

export default Avatar;
