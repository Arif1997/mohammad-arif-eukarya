//Upon the loading of the map it set the center of the map into Delhi lat and lon

export const handleApiLoaded = (
  map: google.maps.Map,
  maps: typeof google.maps
) => {
  const newCenter = new maps.LatLng(28.7041, 77.1025);
  map.setCenter(newCenter);
};
