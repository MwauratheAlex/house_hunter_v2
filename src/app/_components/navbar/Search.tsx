"use client";
import SearchInput from "../Inputs/SearchInput";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import qs from "query-string";
import { useRouter } from "next/navigation";

const Search = () => {
  const router = useRouter();
  const IListingParams = z.object({
    location: z.string(),
    rentOrBuy: z.string(),
    bedrooms: z.string(),
    budget: z.string(),
  });

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<z.infer<typeof IListingParams>>({
    resolver: zodResolver(IListingParams),
    defaultValues: {
      location: "Kiambaa",
      rentOrBuy: "rent",
      bedrooms: "3",
      budget: "30000",
    },
  });

  const submitHandler = (data: z.infer<typeof IListingParams>) => {
    const query = {
      location: data.location,
      rentOrBuy: data.rentOrBuy,
      bedrooms: data.bedrooms,
      budget: data.budget,
    };

    const url = qs.stringifyUrl(
      {
        url: "/",
        query,
      },
      { skipNull: true },
    );

    router.push(url);
  };

  return (
    <div className="w-full">
      <form
        action=""
        className="flex justify-between gap-4"
        onSubmit={handleSubmit(submitHandler)}
      >
        <input
          className={`w-full rounded-full border border-red-500 px-4 py-3`}
          type="text"
          {...register("location")}
        />
        <input
          className={`hidden w-full rounded-full border border-red-500 px-4 py-3 md:block`}
          type="text"
          {...register("rentOrBuy")}
        />
        <input
          className={`hidden w-full rounded-full border border-red-500 px-4 py-3 lg:block`}
          type="text"
          {...register("bedrooms")}
        />
        <input
          className={`hidden w-full rounded-full border border-red-500 px-4 py-3 lg:block`}
          type="text"
          {...register("budget")}
        />
        {/* <SearchInput className="hidden md:block" />
        <SearchInput className="hidden lg:block" />
        <SearchInput className="hidden lg:block" /> */}
        <button>More Filters</button>
        <button type="submit">Submit</button>
      </form>
    </div>
  );
};

export default Search;
