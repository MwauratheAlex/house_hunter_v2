import Image from "next/image";

type ImageIconProps = {
  path: string;
  size: number;
  className?: string;
};

const ImageIcon: React.FC<ImageIconProps> = (props: ImageIconProps) => {
  if (!props.path.startsWith("/")) return undefined;
  return (
    <Image
      src={props.path}
      alt={"icon"}
      height={props.size}
      width={props.size}
      className={props.className}
    />
  );
};

export default ImageIcon;
