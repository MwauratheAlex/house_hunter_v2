const ListingCard = (props: { idx: number }) => {
  return (
    <div
      className=" flex h-96 w-full items-center justify-center
        rounded-lg border border-red-700 text-6xl font-bold text-slate-400"
    >
      {props.idx}
    </div>
  );
};

export default ListingCard;
