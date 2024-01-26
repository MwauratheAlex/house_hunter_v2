import { FieldValues, UseFormRegister } from "react-hook-form";
import { z } from "zod";
import { PropertyInput, PropertyKeys } from "~/types";

type CheckBoxProps = {
  id: string;
  label: string;
  value: string;
  onClick?: (value: string) => void;
  register: UseFormRegister<z.infer<typeof PropertyInput>>;
  group: PropertyKeys;
};

const CheckBox = (props: CheckBoxProps) => {
  return (
    <li>
      <input
        type="checkbox"
        id={props.label}
        value={props.value}
        className="peer hidden"
        {...props.register(props.group)}
      />
      <label
        htmlFor={props.label}
        className="inline-flex w-full cursor-pointer items-center
        justify-between rounded-lg border-2 border-gray-200
        bg-white p-5 hover:bg-gray-50
        hover:text-gray-600 peer-checked:border-black
        peer-checked:text-gray-600 "
      >
        <div className="block">
          <div className="w-full">{props.label}</div>
        </div>
      </label>
    </li>
  );
};

export default CheckBox;
