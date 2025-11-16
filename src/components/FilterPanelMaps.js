export default function FilterPanelMaps({
  showHuts,
  showTrails,
  activeTrail,
  setShowHuts,
  setShowTrails,
  setActiveTrail,
}) {
  return (
    <div className="filter-panel">
      <h3>Filtrer kart</h3>

      <label>
        <input
          type="checkbox"
          checked={showHuts}
          onChange={(e) => setShowHuts(e.target.checked)}
        />
        Vis hytter
      </label>

      <br />

      <label>
        <input
          type="checkbox"
          checked={showTrails}
          onChange={(e) => setShowTrails(e.target.checked)}
        />
        Vis stier
      </label>

      <hr />

      <h4>Velg sti:</h4>

      <button onClick={() => setActiveTrail(null)}>Alle stier</button>
      <button onClick={() => setActiveTrail("rundtur")}>
        Norefjell Rundtur
      </button>
      <button onClick={() => setActiveTrail("fjelltopprunden")}>
        Fjelltopprunden
      </button>
      <button onClick={() => setActiveTrail("olberg")}>
        Olberg – Skolen
      </button>
    </div>
  );
}
