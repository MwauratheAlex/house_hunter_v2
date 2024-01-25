import { useCallback } from "react";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

type CounterProps = {
  onChange: (value: number) => void;
  title: string;
  subtitle: string;
  value: number;
};

const Counter = (props: CounterProps) => {
  const onAdd = useCallback(() => {
    props.onChange(props.value + 1);
  }, [props.onChange, props.value]);

  const onReduce = useCallback(() => {
    if (props.value === 1) return;

    props.onChange(props.value - 1);
  }, [props.onChange, props.value]);

  return (
    <div className="flex flex-row items-center justify-between">
      <div className="flex flex-col">
        <div className="font-medium">{props.title}</div>
        <div className="font-light text-gray-600">{props.subtitle}</div>
      </div>
      <div className="flex flex-row items-center gap-4">
        <div
          onClick={onReduce}
          className="flex h-10 w-10 cursor-pointer items-center
            justify-center rounded-full border border-neutral-400
            text-neutral-600 transition hover:opacity-80"
        >
          <AiOutlineMinus />
        </div>
        <div className="text-xl font-light text-neutral-600">{props.value}</div>
        <div
          onClick={onAdd}
          className="
            flex
            h-10
            w-10
            cursor-pointer
            items-center
            justify-center
            rounded-full
            border-[1px]
            border-neutral-400
            text-neutral-600
            transition
            hover:opacity-80
          "
        >
          <AiOutlinePlus />
        </div>
      </div>
    </div>
  );
};

export default Counter;
