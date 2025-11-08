import { useEffect, useRef } from "react";
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
import { Style, Icon, Stroke } from "ol/style";
import Overlay from "ol/Overlay";

export default function OpenMap() {
  const mapRef = useRef();
  const popupRef = useRef();

  // Data for å få koordinatene til Noresund sentrum
  //https://norgeskart.no/?_ga=2.174167140.739854145.1597839443-97377799.1583162072#!?project=norgeskart&layers=1004&zoom=13&lat=6683628.35&lon=201502.44&markerLat=6683628.353670884&markerLon=201502.43658477772&panel=Turkart&p=Koordinater&sok=noresund
  useEffect(() => {
    const noresundSentrum = fromLonLat([9.61519, 60.17989]);

    // === Hytter ===
    const huts = [
      { name: "Norefjell Ski & Hytteområde", coords: [9.63, 60.285] },
      { name: "Norefjellstua Turisthytte", coords: [9.628, 60.287] },
      { name: "Fjellhytte", coords: [9.635, 60.284] },
      { name: "Norefjellstua", coords: [9.5629, 60.22184] },
    ];

    const hutFeatures = huts.map(hut => {
      const f = new Feature({
        geometry: new Point(fromLonLat(hut.coords)),
        name: hut.name,
        type: "hut"
      });
      f.setStyle(
        new Style({
          image: new Icon({
            src: "https://cdn-icons-png.flaticon.com/512/684/684908.png",
            scale: 0.05
          })
        })
      );
      return f;
    });

    // === Turstier ===
    const trails = [
      {
        name: "Norefjell Rundtur",
        coords: [
          [9.630, 60.284],
          [9.632, 60.285],
          [9.634, 60.286],
          [9.636, 60.288]
        ]
      },
      {
        name: "Fjelltopprunden",
        coords: [
          [9.628, 60.287],
          [9.629, 60.288],
          [9.631, 60.289]
        ]
      },
      {
        name: "Olberg Kirke til Skolen",
        coords: [
          [9.63603, 60.1711871],
          [9.6373714, 60.1730335],
          [9.6347989, 60.1742761],
          [9.6325535, 60.1753383],
          [9.6279923, 60.1784539],
          [9.624509, 60.1796521],
          [9.6231964, 60.1794988],
          [9.6216559, 60.1793362],
        ]
      },
    ];

    const trailFeatures = trails.map(trail => {
      const f = new Feature({
        geometry: new LineString(trail.coords.map(c => fromLonLat(c))),
        name: trail.name,
        type: "trail"
      });
      f.setStyle(
        new Style({
          stroke: new Stroke({
            color: "#FF5733",
            width: 3
          })
        })
      );
      return f;
    });

    const vectorLayer = new VectorLayer({
      source: new VectorSource({
        features: [...hutFeatures, ...trailFeatures]
      })
    });

    // === Opprett kartet ===
    const map = new Map({
      target: mapRef.current,
      layers: [
        new TileLayer({ source: new OSM() }),
        vectorLayer
      ],
      view: new View({
        center: noresundSentrum,
        zoom: 14
      })
    });

    // === Popup overlay ===
    const overlay = new Overlay({
      element: popupRef.current,
      autoPan: true,
      autoPanAnimation: { duration: 250 }
    });
    map.addOverlay(overlay);

    map.on("click", evt => {
      const feature = map.forEachFeatureAtPixel(evt.pixel, f => f);
      if (feature) {
        overlay.setPosition(evt.coordinate);
        const type = feature.get("type");
        popupRef.current.innerHTML = `<b>${feature.get("name")}</b> (${type})`;
      } else {
        overlay.setPosition(undefined);
      }
    });

    return () => map.setTarget(undefined);
  }, []);

  return (
    <>
      <div
        ref={mapRef}
        style={{ width: "100%", height: "500px", marginTop: "20px" }}
      />
      <div
        ref={popupRef}
        style={{
          backgroundColor: "white",
          padding: "5px 10px",
          borderRadius: "4px",
          border: "1px solid #333",
          position: "absolute"
        }}
      />
    </>
  );
}
