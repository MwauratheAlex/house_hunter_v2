import { FieldErrors, FieldValues, UseFormRegister } from "react-hook-form";
import { BiDollar } from "react-icons/bi";
import { z } from "zod";
import { PropertyInput, PropertyKeys } from "~/types";

type InputProps = {
  id: PropertyKeys | any;
  label: string;
  type?: string;
  disabled?: boolean;
  formatPrice?: boolean;
  required?: boolean;
  register: UseFormRegister<z.infer<typeof PropertyInput>> | any;
  errors: FieldErrors;
};

const Input = (props: InputProps) => {
  return (
    <div className="relative w-full">
      {props.formatPrice && (
        <BiDollar
          size={24}
          className="absolute left-2 top-5 text-neutral-700"
        />
      )}
      <input
        id={props.id}
        disabled={props.disabled}
        {...props.register(props.id, {
          required: props.required,
          valueAsNumber: props.formatPrice,
        })}
        placeholder=" "
        type={props.type}
        className={`
            peer w-full rounded-md border-2 bg-white p-4 pt-6
            text-lg font-light outline-none transition
            disabled:cursor-not-allowed disabled:opacity-70
            ${props.formatPrice ? "pl-9" : "pl-4"}
            ${props.errors[props.id] ? "border-rose-500" : "border-neutral-300"}
            ${props.errors[props.id] ? "focus:border-rose-500" : "focus:border-black"}
        `}
      />
      <label
        className={`
            absolute top-5 z-10 origin-[0] -translate-y-3
            transform text-base duration-150 ${props.formatPrice ? "left-9" : "left-4"}
            peer-placeholder-shown:translate-y-0
            peer-placeholder-shown:scale-100
            peer-focus:-translate-y-4
            peer-focus:scale-75
            ${props.errors[props.id] ? "text-rose-500" : "text-zinc-400"}
        `}
      >
        {props.label}
      </label>
    </div>
  );
};

export default Input;
