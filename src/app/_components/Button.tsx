import { IconType } from "react-icons";

type ButtonProps = {
  label: string;
  onClick: (e: React.MouseEvent<HTMLButtonElement>) => void;
  disabled?: boolean;
  outline?: boolean;
  small?: boolean;
  icon?: IconType;
};

const Button = ({ icon: Icon, ...props }: ButtonProps) => {
  return (
    <button
      onClick={props.onClick}
      disabled={props.disabled}
      className={`
            relative w-full rounded-lg
            transition hover:opacity-80 disabled:cursor-not-allowed disabled:opacity-70
            ${props.outline ? "bg-white" : "bg-gray-950"}
            ${props.outline ? "border-black" : "border-gray-950"}
            ${props.outline ? "text-black" : "text-white"}
            ${props.small ? "text-sm" : "  text-base"}
            ${props.small ? "py-1" : "py-3"}
            ${props.small ? "font-light" : "font-semibold"}
            ${props.small ? "border" : "border-2"}
        `}
    >
      {Icon && <Icon size={24} className="absolute left-4 top-3" />}
      {props.label}
    </button>
  );
};

export default Button;
