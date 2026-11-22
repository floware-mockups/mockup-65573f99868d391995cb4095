// @ts-nocheck
import { customTicker, customTimers } from "../customGuard.ts";
const __mk = customTicker("FiltroRegioni");
const { setTimeout, setInterval, clearTimeout, clearInterval } = customTimers("FiltroRegioni");
import { useState } from "react";
import { Card, Select, Button, useTable, usePrototype } from "../floware";

export default function FiltroRegioni({ pageId }) {__mk();
  const table = useTable(pageId);
  const { openDetail } = usePrototype();
  const [scelte, setScelte] = useState([]);
  const pagine = ["quadro-generale", "sedi-vacanti", "tempi-per-regione", "vicesegretari"];
  if (!pagine.includes(pageId) || !table) return null;
  const indice = table.column("Regione");
  if (indice < 0) return <p>Colonna Regione non disponibile.</p>;
  const regioni = [...new Set(table.rows.map((riga) => (__mk(), riga[indice])).filter((valore) => (__mk(), Boolean(valore))))].sort();
  const salvata = scelte.find((voce) => (__mk(), voce.pagina === pageId));
  const scelta = salvata ? salvata.valore : "Tutte le regioni";
  const selezione = regioni.includes(scelta) ? scelta : "Tutte le regioni";
  const risultati = table.rows.map((riga, index) => ((__mk(), { riga, index }))).filter((voce) => (__mk(), selezione === "Tutte le regioni" || voce.riga[indice] === selezione));
  function cambia(valore) {__mk();
    setScelte((precedenti) => (__mk(), precedenti.filter((voce) => (__mk(), voce.pagina !== pageId)).concat([{ pagina: pageId, valore: valore }])));
  }
  return (
    <Card title="Consulta per regione">
      <div className="space-y-4">
        <Select label="Regione" value={selezione} options={["Tutte le regioni", ...regioni]} onChange={cambia} />
        <div className="flex flex-wrap items-center justify-between gap-3">
          <p className="text-(--mk-muted)">{risultati.length} righe su {table.rows.length}. Vista filtrata; la tabella originale resta invariata.</p>
          <Button variant="secondary" onClick={() => (__mk(), cambia("Tutte le regioni"))} disabled={selezione === "Tutte le regioni"}>Azzera filtro</Button>
        </div>
        {risultati.length === 0 ? <p>Nessun risultato disponibile.</p> : (
          <div className="overflow-x-auto">
            <table className="w-full text-left text-sm text-(--mk-text)">
              <thead className="bg-(--mk-subtle)">
                <tr>{table.columns.map((colonna) => (__mk(), <th key={colonna} scope="col" className="p-3">{colonna}</th>))}<th scope="col" className="p-3">Dettaglio</th></tr>
              </thead>
              <tbody>
                {risultati.map((voce) => (
                  (__mk(), <tr key={voce.index} className="border-b border-(--mk-divider)">
                    {table.columns.map((colonna, i) => (__mk(), <td key={colonna} className="p-3">{voce.riga[i]}</td>))}
                    <td className="p-3"><Button variant="link" onClick={() => (__mk(), openDetail(pageId, voce.index))}>Apri</Button></td>
                  </tr>)
                ))}
              </tbody>
            </table>
          </div>
        )}
      </div>
    </Card>
  );
}
