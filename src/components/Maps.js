import { useEffect, useRef, useState } from "react";
import "ol/ol.css";
import Map from "ol/Map";
import View from "ol/View";
import TileLayer from "ol/layer/Tile";
import OSM from "ol/source/OSM";
import { fromLonLat } from "ol/proj";
import VectorLayer from "ol/layer/Vector";
import VectorSource from "ol/source/Vector";
import Feature from "ol/Feature";
import Point from "ol/geom/Point";
import LineString from "ol/geom/LineString";
import { Style, Icon, Stroke, Fill, Circle } from "ol/style";
import Overlay from "ol/Overlay";
import Geolocation from "ol/Geolocation";

export default function Maps({ showHuts, showTrails, activeTrail }) {
  const mapRef = useRef();
  const popupRef = useRef();
  const mapObj = useRef();

  const [followMe, setFollowMe] = useState(false);
  const geolocationRef = useRef();
  const userFeatureRef = useRef();

  useEffect(() => {
    if (mapObj.current) return; // Opprett kun ett kart

    const center = fromLonLat([9.61519, 60.17989]);

    // --- Hytter ---
    const huts = [
      { name: "Norefjell Ski & Hytteområde", coords: [9.63, 60.285] },
      { name: "Norefjellstua Turisthytte", coords: [9.628, 60.287] },
      { name: "Fjellhytte", coords: [9.635, 60.284] },
      { name: "Norefjellstua", coords: [9.5629, 60.22184] },
    ];

    const hutFeatures = huts.map((hut) => {
      const f = new Feature({
        geometry: new Point(fromLonLat(hut.coords)),
        name: hut.name,
        layer: "huts",
      });
      f.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            scale: 0.05,
          }),
        })
      );
      return f;
    });

    // --- Stier ---
    const trails = [
      {
        id: "rundtur",
        name: "Norefjell Rundtur",
        coords: [
          [9.630, 60.284],
          [9.632, 60.285],
          [9.634, 60.286],
          [9.636, 60.288],
        ],
      },
      {
        id: "fjelltopprunden",
        name: "Fjelltopprunden",
        coords: [
          [9.628, 60.287],
          [9.629, 60.288],
          [9.631, 60.289],
        ],
      },
      {
        id: "olberg",
        name: "Olberg – Skolen",
        coords: [
          [9.63603, 60.1711871],
          [9.6373714, 60.1730335],
          [9.6347989, 60.1742761],
          [9.6325535, 60.1753383],
          [9.6279923, 60.1784539],
          [9.624509, 60.1796521],
          [9.6231964, 60.1794988],
          [9.6216559, 60.1793362],
        ],
      },
    ];

    const trailFeatures = trails.map((trail) => {
      const f = new Feature({
        geometry: new LineString(trail.coords.map((c) => fromLonLat(c))),
        name: trail.name,
        trailId: trail.id,
        layer: "trails",
      });
      f.setStyle(
        new Style({
          stroke: new Stroke({ color: "#FF5733", width: 3 }),
        })
      );
      return f;
    });

    // --- Vector layer ---
    const vectorSource = new VectorSource({ features: [...hutFeatures, ...trailFeatures] });
    const vectorLayer = new VectorLayer({ source: vectorSource });

    // --- Kart ---
    const map = new Map({
      target: mapRef.current,
      layers: [new TileLayer({ source: new OSM() }), vectorLayer],
      view: new View({ center, zoom: 13 }),
    });

    // --- Popup ---
    const overlay = new Overlay({
      element: popupRef.current,
      autoPan: true,
      autoPanAnimation: { duration: 250 },
    });
    map.addOverlay(overlay);

    map.on("click", (evt) => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, (f) => f);
      if (feature) {
        overlay.setPosition(evt.coordinate);
        popupRef.current.innerHTML = `<b>${feature.get("name")}</b>`;
      } else {
        overlay.setPosition(undefined);
      }
    });

    window.addEventListener("resize", () => map.updateSize());

    // --- Brukerposisjon ---
    const userFeature = new Feature();
    userFeature.setStyle(
      new Style({
        image: new Circle({
          radius: 7,
          fill: new Fill({ color: "#007bff" }),
          stroke: new Stroke({ color: "#fff", width: 2 }),
        }),
      })
    );

    const userLayer = new VectorLayer({
      source: new VectorSource({ features: [userFeature] }),
    });
    map.addLayer(userLayer);

    const geolocation = new Geolocation({ projection: map.getView().getProjection(), tracking: false });
    geolocation.on("change:position", () => {
      const coords = geolocation.getPosition();
      if (!coords) return;
      userFeature.setGeometry(new Point(coords));
      if (followMe) map.getView().animate({ center: coords, duration: 300 });
    });

    mapObj.current = { map, vectorSource, hutFeatures, trailFeatures };
    geolocationRef.current = geolocation;
    userFeatureRef.current = userFeature;
  }, []);

  // --- Filtrering av hytter og stier ---
  useEffect(() => {
    if (!mapObj.current) return;
    const { vectorSource, hutFeatures, trailFeatures } = mapObj.current;

    vectorSource.clear();
    const hutsToShow = showHuts ? hutFeatures : [];
    const trailsToShow = showTrails
      ? activeTrail
        ? trailFeatures.filter((t) => t.get("trailId") === activeTrail)
        : trailFeatures
      : [];

    vectorSource.addFeatures([...hutsToShow, ...trailsToShow]);
  }, [showHuts, showTrails, activeTrail]);

  // --- Følg meg knapp ---
  const toggleFollowMe = () => {
    if (!geolocationRef.current || !userFeatureRef.current) return;

    const tracking = !followMe;
    geolocationRef.current.setTracking(tracking);
    setFollowMe(tracking);

    if (!tracking) {
      // Fjern prikken
      userFeatureRef.current.setGeometry(null);
    } else {
      // Sett geometrien til siste posisjon umiddelbart
      const coords = geolocationRef.current.getPosition();
      if (coords) {
        userFeatureRef.current.setGeometry(new Point(coords));
        mapObj.current.map.getView().animate({ center: coords, duration: 300 });
      }
    }
  };

  return (
    <div style={{ position: "relative" }}>
      <button
        onClick={toggleFollowMe}
        style={{
          position: "absolute",
          top: "10px",
          right: "10px",
          zIndex: 1000,
          padding: "6px 10px",
          fontSize: "12px",
          borderRadius: "6px",
          border: "none",
          cursor: "pointer",
          backgroundColor: followMe ? "#007bff" : "#666",
          color: "white",
        }}
      >
        {followMe ? "Stop" : "Følg meg"}
      </button>

      <div
        ref={mapRef}
        style={{ width: "100%", height: "65vh", minHeight: "320px", borderRadius: "10px" }}
      />

      <div
        ref={popupRef}
        style={{
          backgroundColor: "white",
          padding: "6px 12px",
          borderRadius: "6px",
          border: "1px solid #444",
          position: "absolute",
          zIndex: 2000,
        }}
      />
    </div>
  );
}
