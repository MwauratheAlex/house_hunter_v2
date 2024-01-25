import usePlacesAutocomplete, {
  LatLng,
  getGeocode,
  getLatLng,
} from "use-places-autocomplete";
import { CiLocationOn } from "react-icons/ci";
import { useState } from "react";

type LocationSelectProps = {
  value?: google.maps.places.AutocompletePrediction;
  onChange: (selection: LatLng) => void;
};

const LocationSelect = (props: LocationSelectProps) => {
  const {
    ready,
    value,
    suggestions: { status, data },
    setValue,
    clearSuggestions,
  } = usePlacesAutocomplete({
    debounce: 300,
    cache: 86400,
  });

  const handleSelect = (
    suggestion: google.maps.places.AutocompletePrediction,
  ) => {
    clearSuggestions();
    getGeocode({ address: suggestion.description }).then((result) => {
      if (result[0]) {
        const location = getLatLng(result[0]);
        props.onChange(location);
      }
    });
  };

  return (
    <div className="relative">
      <input
        className="flex w-full cursor-pointer flex-col justify-center gap-3 rounded-md
        border border-gray-400 p-4 text-lg text-neutral-500 transition hover:border-black"
        value={value}
        disabled={!ready}
        onChange={(e) => setValue(e.target.value)}
        placeholder="Anywhere"
      />
      {status === "OK" && (
        <Suggestions onClick={handleSelect} suggestions={data} />
      )}
    </div>
  );
};

const Suggestions = (props: {
  suggestions: google.maps.places.AutocompletePrediction[];
  onClick: (suggestion: google.maps.places.AutocompletePrediction) => void;
}) => {
  return (
    <div className="absolute z-50 flex w-full cursor-pointer flex-col rounded-md bg-gray-100">
      {props.suggestions.map((suggestion) => (
        <div
          key={suggestion.place_id}
          className="flex cursor-pointer items-center gap-2 px-1 py-3 transition hover:bg-gray-200"
          onClick={() => props.onClick(suggestion)}
        >
          <CiLocationOn />
          <div>{suggestion.description}</div>
        </div>
      ))}
    </div>
  );
};

export default LocationSelect;
