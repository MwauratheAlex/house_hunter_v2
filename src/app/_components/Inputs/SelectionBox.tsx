import { IconType } from "react-icons";
import ImageIcon from "../icons/ImageIcon";

type SelectionBoxProps = {
  label: string;
  onClick: (value: string) => void;
  selected?: boolean;
  icon?: string;
  iconSize?: number;
};

const SelectionBox = (props: SelectionBoxProps) => {
  return (
    <div
      className={`
        flex cursor-pointer flex-col justify-center
        gap-3 rounded-xl border-2 p-4 transition hover:border-black
        ${props.selected ? "border-black" : " border-neutral-200"}
    `}
      onClick={() => props.onClick(props.label)}
    >
      {props.icon && (
        <ImageIcon path={props.icon} size={props.iconSize || 28} />
      )}
      <div className="w-max font-semibold">{props.label}</div>
    </div>
  );
};

export default SelectionBox;
