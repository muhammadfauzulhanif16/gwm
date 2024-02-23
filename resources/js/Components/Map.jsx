import mapboxgl from "mapbox-gl"; // eslint-disable-line import/no-webpack-loader-syntax
import { useEffect, useRef, useState } from "react";

mapboxgl.accessToken =
  "pk.eyJ1IjoiZWZ6ZWRlbDE2IiwiYSI6ImNscnZ3anJ5dDB1MWUyam82NWN5a3EybGsifQ.xTpjFPGxWCc-wOTYS7pcXQ";

export const Map = ({ citizens }) => {
  // console.log(citizens);

  const mapContainer = useRef(null);
  const map = useRef(null);
  const [spinEnabled] = useState(true);

  useEffect(() => {
    if (map.current) return;

    navigator.geolocation.getCurrentPosition(
      (position) => {
        const { latitude, longitude } = position.coords;

        map.current = new mapboxgl.Map({
          container: mapContainer.current,
          style: "mapbox://styles/mapbox/streets-v12",
          center: [longitude, latitude],
        });

        // map.current.on("style.load", () => {
        //   map.current.setFog({});
        // });

        // const secondsPerRevolution = 120;
        // const maxSpinZoom = 5;
        // const slowSpinZoom = 3;

        // let userInteracting = false;

        // function spinGlobe() {
        //   const zoom = map.current.getZoom();
        //   if (spinEnabled && !userInteracting && zoom < maxSpinZoom) {
        //     let distancePerSecond = 360 / secondsPerRevolution;
        //     if (zoom > slowSpinZoom) {
        //       const zoomDif =
        //         (maxSpinZoom - zoom) / (maxSpinZoom - slowSpinZoom);
        //       distancePerSecond *= zoomDif;
        //     }
        //     const center = map.current.getCenter();
        //     center.lng -= distancePerSecond;
        //     map.current.easeTo({ center, duration: 1000, easing: (n) => n });
        //   }
        // }

        // map.current.on("mousedown", () => {
        //   userInteracting = true;
        // });

        // map.current.on("mouseup", () => {
        //   userInteracting = false;
        //   spinGlobe();
        // });

        // map.current.on("dragend", () => {
        //   userInteracting = false;
        //   spinGlobe();
        // });

        // map.current.on("pitchend", () => {
        //   userInteracting = false;
        //   spinGlobe();
        // });

        // map.current.on("rotateend", () => {
        //   userInteracting = false;
        //   spinGlobe();
        // });

        // map.current.on("moveend", () => {
        //   spinGlobe();
        // });

        // spinGlobe();

        const popup = new mapboxgl.Popup({ offset: 25 }).setText(
          "Lokasi Anda saat ini",
        );

        new mapboxgl.Marker()
          .setLngLat([longitude, latitude])
          .setPopup(popup)
          .addTo(map.current);

        map.current.addControl(new mapboxgl.FullscreenControl());
        map.current.addControl(new mapboxgl.NavigationControl(), "top-left");
        map.current.addControl(new mapboxgl.ScaleControl());
        map.current.addControl(
          new mapboxgl.GeolocateControl({
            positionOptions: {
              enableHighAccuracy: true,
            },
            trackUserLocation: true,
            showUserHeading: true,
          }),
        );

        map.current.on("load", () => {
          const groupedCitizens = citizens.reduce((grouped, citizen) => {
            const key = `${citizen.latitude},${citizen.longitude}`;
            if (!grouped[key]) {
              grouped[key] = [];
            }
            grouped[key].push(citizen);
            return grouped;
          }, {});

          // Convert grouped citizens to geojson
          const data = {
            type: "FeatureCollection",
            features: Object.values(groupedCitizens).map((group) => ({
              type: "Feature",
              properties: {
                // Join all citizen names in the group
                description: group
                  .map((citizen) => `<strong>${citizen.name}</strong>`)
                  .join(", "),
              },
              geometry: {
                type: "Point",
                coordinates: [group[0].longitude, group[0].latitude],
              },
            })),
          };

          map.current.addSource("places", {
            type: "geojson",
            data: data,
          });
          // Add a layer showing the places.
          map.current.addLayer({
            id: "places",
            type: "circle",
            source: "places",
            paint: {
              "circle-color": "#4264fb",
              "circle-radius": 6,
              "circle-stroke-width": 2,
              "circle-stroke-color": "#ffffff",
            },
          });

          // Create a popup, but don't add it to the map yet.
          const popup = new mapboxgl.Popup({
            closeButton: false,
            closeOnClick: false,
          });

          // When the user clicks, open a popup at the clicked location.
          map.current.on("click", "places", (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map.current);
          });

          map.current.on("mousemove", "places", (e) => {
            const coordinates = e.features[0].geometry.coordinates.slice();
            const description = e.features[0].properties.description;

            // Ensure that if the map is zoomed out such that
            // multiple copies of the feature are visible, the
            // popup appears over the copy being pointed to.
            while (Math.abs(e.lngLat.lng - coordinates[0]) > 180) {
              coordinates[0] += e.lngLat.lng > coordinates[0] ? 360 : -360;
            }

            popup
              .setLngLat(coordinates)
              .setHTML(description)
              .addTo(map.current);
          });

          map.current.on("mouseleave", "places", () => {
            popup.remove();
          });
        });
      },
      (error) => {
        console.log("Error occurred while fetching geolocation", error);
      },
    );
  });

  return (
    <div
      ref={mapContainer}
      style={{
        borderRadius: 8,
        width: "100%",
        height: "100%",
        cursor: "pointer",
      }}
    />
  );
};
