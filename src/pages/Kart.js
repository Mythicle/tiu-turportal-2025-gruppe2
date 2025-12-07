import { useState } from "react";
import Maps from "../components/Maps.js";
import FilterPanelMaps from "../components/FilterPanelMaps.js";

export default function Kart() {
  const [showHuts, setShowHuts] = useState(true);
  const [showTrails, setShowTrails] = useState(true);
  const [activeTrail, setActiveTrail] = useState(null);

  return (
    <div
      style={{
        display: "grid",
        gridTemplateColumns: "300px 1fr",
        gap: "20px",
        padding: "20px",
      }}
    >
      <FilterPanelMaps
        showHuts={showHuts}
        showTrails={showTrails}
        activeTrail={activeTrail}
        setShowHuts={setShowHuts}
        setShowTrails={setShowTrails}
        setActiveTrail={setActiveTrail}
      />

      <Maps
        showHuts={showHuts}
        showTrails={showTrails}
        activeTrail={activeTrail}
      />
    </div>
  );
}
