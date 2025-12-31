import { useEffect, useRef } from "react";
import Map from "ol/Map.js";
import View from "ol/View.js";
import TileLayer from "ol/layer/Tile.js";
import VectorLayer from "ol/layer/Vector.js";
import OSM from "ol/source/OSM.js";
import VectorSource from "ol/source/Vector.js";
import Feature from "ol/Feature.js";
import Point from "ol/geom/Point.js";
import LineString from "ol/geom/LineString.js";
import { fromLonLat } from "ol/proj.js";
import { Style, Icon, Text, Fill, Stroke } from "ol/style.js";

function Maps() {
  const mapRef = useRef(null);

  useEffect(() => {
    // Hytter
    const hutSource = new VectorSource();

    const hutLayer = new VectorLayer({
      source: hutSource,
      style: (feature) =>
        new Style({
          image: new Icon({
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            scale: 0.05,
            anchor: [0.5, 1],
          }),
          text: new Text({
            text: feature.get("name"),
            offsetY: -25,
            fill: new Fill({ color: "#fff" }),
            stroke: new Stroke({ color: "#000", width: 3 }),
          }),
        }),
    });

    // Stier
    const trailSource = new VectorSource();
    const trailLayer = new VectorLayer({
      source: trailSource,
      style: (feature) =>
        new Style({
          stroke: new Stroke({
            color: "#FF5733",
            width: 3,
          }),
          text: new Text({
            text: feature.get("name"),
            placement: "line",
            overflow: true,
            font: "bold 14px sans-serif",
            fill: new Fill({ color: "#ffffff" }),
            stroke: new Stroke({ color: "#000000", width: 3 }),
          }),
        }),
    });

    // Kart
    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), trailLayer, hutLayer],
      view: new View({
        center: fromLonLat([9.6, 60.18]),
        zoom: 12,
      }),
    });

    // Hent hytter
    fetch("http://localhost:4000/huts")
      .then((res) => res.json())
      .then((huts) => {
        huts.forEach((hut) => {
          hutSource.addFeature(
            new Feature({
              geometry: new Point(fromLonLat([hut.lon, hut.lat])),
              name: hut.name,
            })
          );
        });
      });

    // Hent stier
    fetch("http://localhost:4000/trails")
      .then((res) => res.json())
      .then((rows) => {
        console.log("TRAIL ROWS:", rows);

        const trailsById = {};

        // Gruppér alle punkter per trail_id
        rows.forEach((row) => {
          if (!trailsById[row.trail_id]) {
            trailsById[row.trail_id] = [];
          }

          trailsById[row.trail_id].push({
            lon: row.lon,
            lat: row.lat,
            order: row.point_order,
          });
        });

        // Lag én LineString per trail_id
        Object.entries(trailsById).forEach(([trailId, points]) => {
          console.log("Trail", trailId, points);

          if (points.length < 2) return;

          const coords = points
            .sort((a, b) => a.order - b.order)
            .map((p) => fromLonLat([p.lon, p.lat]));

          const feature = new Feature({
            geometry: new LineString(coords),
            trail_id: trailId,
            name: rows.find((r) => r.trail_id === trailId)?.name,
          });

          trailSource.addFeature(feature);
        });
      })
      .catch((err) => console.error("Feil ved henting av stier:", err));
    return () => map.setTarget(undefined);
  }, []);

  return <div ref={mapRef} style={{ width: "100%", height: "80vh" }} />;
}

export default Maps;
