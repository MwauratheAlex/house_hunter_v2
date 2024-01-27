import { BsExclamationTriangle } from "react-icons/bs";

const FormError = (props: { message: string }) => {
  if (!props.message) return null;
  return (
    <div
      className="flex items-center justify-center
        gap-4 rounded-md bg-red-500/10 p-3 text-red-600"
    >
      <BsExclamationTriangle className="h-4 w-4" />
      <div className="  ">{props.message}</div>
    </div>
  );
};

export default FormError;
