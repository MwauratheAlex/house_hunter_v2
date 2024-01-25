import { useCallback } from "react";
import { CldUploadWidget } from "next-cloudinary";
import { TbPhotoPlus } from "react-icons/tb";
import Image from "next/image";

type ImageUploadProps = {
  onChange: (value: string) => void;
  value?: string;
};
const uploadPreset = "kbkegw6k";

const ImageUpload = (props: ImageUploadProps) => {
  const handleUpload = useCallback(
    (result: any) => {
      props.onChange(result.info.secure_url);
    },
    [props.onChange],
  );
  return (
    <CldUploadWidget
      onUpload={handleUpload}
      uploadPreset={uploadPreset}
      options={{ maxFiles: 1 }}
    >
      {({ open }) => {
        return (
          <div
            onClick={() => open()}
            className=" 
                relative flex cursor-pointer flex-col items-center
                justify-center gap-4 border-2 border-dashed border-neutral-300
                p-20 text-neutral-600 transition hover:opacity-70"
          >
            <TbPhotoPlus size={50} />
            <div className="text-lg font-semibold">Click to upload</div>
            {props.value && (
              <div className="absolute inset-0 h-full w-full">
                <Image
                  fill
                  src={props.value}
                  alt="House"
                  style={{ objectFit: "cover" }}
                />
              </div>
            )}
          </div>
        );
      }}
    </CldUploadWidget>
  );
};

export default ImageUpload;
