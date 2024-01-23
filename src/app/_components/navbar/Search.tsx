import SearchInput from "../Inputs/SearchInput";

const Search = () => {
  return (
    <div className="w-full">
      <form action="" className="flex justify-between gap-4">
        <SearchInput className="" />
        <SearchInput className="hidden md:block" />
        <SearchInput className="hidden lg:block" />
        <SearchInput className="hidden lg:block" />
        <button>More Filters</button>
        <button>Submit</button>
      </form>
    </div>
  );
};

export default Search;
