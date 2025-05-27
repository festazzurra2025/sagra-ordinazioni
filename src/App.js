
import React, { useState } from 'react';

const menu = {
  Primi: ['Trofie al pesto', 'Lasagne', 'Ravioli burro e salvia'],
  Secondi: ['Grigliata mista', 'Frittura di calamari', 'Porchetta con patate', 'Hamburger'],
  Dolci: ['Torta della nonna', 'Gelato', 'Panna cotta']
};

export default function App() {
  const [tavolo, setTavolo] = useState(1);
  const [quantita, setQuantita] = useState(
    Object.fromEntries(Object.values(menu).flat().map(p => [p, 0]))
  );
  const [ordini, setOrdini] = useState([]);

  const inviaOrdine = () => {
    const nuovoOrdine = { tavolo, piatti: { ...quantita } };
    setOrdini([...ordini, nuovoOrdine]);
    setQuantita(Object.fromEntries(Object.keys(quantita).map(p => [p, 0])));
  };

  const visualizzaOrdini = (categoria) => {
    return ordini.map((ordine, i) => {
      const piattiCategoria = Object.entries(ordine.piatti).filter(([piatto, qty]) =>
        menu[categoria].includes(piatto) && qty > 0
      );
      if (piattiCategoria.length === 0) return null;
      return (
        <div key={i}>
          <strong>Tavolo {ordine.tavolo}</strong>
          <ul>
            {piattiCategoria.map(([piatto, qty]) => <li key={piatto}>{piatto}: {qty}</li>)}
          </ul>
        </div>
      );
    });
  };

  return (
    <div style={{ padding: 20 }}>
      <h2>Ordinazione Tavolo</h2>
      <label>Numero Tavolo:
        <input
          type="number"
          value={tavolo}
          onChange={e => setTavolo(parseInt(e.target.value))}
        />
      </label>
      {Object.entries(menu).map(([categoria, piatti]) => (
        <fieldset key={categoria} style={{ marginTop: 20 }}>
          <legend><strong>{categoria}</strong></legend>
          {piatti.map(piatto => (
            <div key={piatto}>
              <label>{piatto}:
                <input
                  type="number"
                  min={0}
                  value={quantita[piatto]}
                  onChange={e =>
                    setQuantita({ ...quantita, [piatto]: parseInt(e.target.value) || 0 })
                  }
                />
              </label>
            </div>
          ))}
        </fieldset>
      ))}
      <button onClick={inviaOrdine} style={{ marginTop: 20 }}>Invia Ordine</button>

      <h2 style={{ marginTop: 30 }}>Cucina: Primi</h2>
      {visualizzaOrdini('Primi')}

      <h2 style={{ marginTop: 30 }}>Cucina: Secondi</h2>
      {visualizzaOrdini('Secondi')}

      <h2 style={{ marginTop: 30 }}>Cucina: Dolci</h2>
      {visualizzaOrdini('Dolci')}
    </div>
  );
}
