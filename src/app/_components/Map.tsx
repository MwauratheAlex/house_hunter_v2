"use client";
import { GoogleMap, useLoadScript } from "@react-google-maps/api";
import React, { useMemo } from "react";

type MapProps = {
  mapCenter?: {
    lat: number;
    lng: number;
  };
};

const Map = (props: MapProps) => {
  const libraries = useMemo(() => ["places"], []);

  const defaultMapCenter = useMemo(() => {
    return {
      lat: 27.672932021393862,
      lng: 85.31184012689732,
    };
  }, []);

  const mapOptions = useMemo<google.maps.MapOptions>(() => {
    return {
      disableDefaultUI: true,
      clickableIcons: true,
      scrollwheel: false,
    };
  }, []);

  const { isLoaded, loadError } = useLoadScript({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_KEY as string,
    libraries: libraries as any,
  });

  if (loadError) return <div>Error Loading Map</div>;

  if (!isLoaded) return <div>Loading ...</div>;

  return (
    <div className="">
      <div className="">
        <GoogleMap
          options={mapOptions}
          zoom={14}
          center={props.mapCenter || defaultMapCenter}
          mapTypeId={google.maps.MapTypeId.ROADMAP}
          mapContainerStyle={{
            width: "100%",
            height: "35vh",
            borderRadius: "0.5rem",
          }}
          onLoad={() => console.log("Map Component Loaded...")}
        />
      </div>
    </div>
  );
};

export default Map;
