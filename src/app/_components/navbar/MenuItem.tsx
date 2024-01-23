const MenuItem = (props: { label: string; onClick: () => void }) => {
  return (
    <div
      className="cursor-pointer px-4 py-3 font-semibold transition hover:bg-neutral-100"
      onClick={props.onClick}
    >
      {props.label}
    </div>
  );
};

export default MenuItem;
