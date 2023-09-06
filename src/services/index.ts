//Upon the loading of the map it set the center of the map into Delhi lat and lon

import { MapOptions } from "../interfaces";

export const handleApiLoaded = (
  map: google.maps.Map,
  maps: typeof google.maps
) => {
  const newCenter = new maps.LatLng(25.7041, 77.1025);
  map.setCenter(newCenter);
  map.setZoom(5);

  // An event listener to track the map's center changes
  map.addListener("center_changed", () => {
    const updatedCenter = map.getCenter();

    console.log("New center:", updatedCenter?.lat(), updatedCenter?.lng());
  });
};

export const toggleMapView = (mapOptions: MapOptions) => {
  //This function is created to Toggle between satellite and roadmap views
  const newMapTypeId =
    mapOptions.mapTypeId === "roadmap" ? "satellite" : "roadmap";
  return newMapTypeId;
};
