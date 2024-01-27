import { IoMdCheckmarkCircleOutline } from "react-icons/io";

const FormError = (props: { message: string }) => {
  if (!props.message) return null;
  return (
    <div
      className="flex items-center justify-center
        gap-4 rounded-md bg-green-500/10 p-3 text-green-800"
    >
      <IoMdCheckmarkCircleOutline className="h-5 w-5" />
      <div className="  ">{props.message}</div>
    </div>
  );
};

export default FormError;
