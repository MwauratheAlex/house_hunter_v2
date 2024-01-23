const SearchInput = (props: { className?: string }) => {
  return (
    <input
      className={`w-full rounded-full border border-red-500 px-4 py-3 ${props.className}`}
      type="text"
      value="input"
    />
  );
};

export default SearchInput;
