import React, { useState } from 'react';

const numCordas = 6;
const numCasas = 25;

// Sequência de notas
const notas = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

// Notas das cordas soltas (6ª a 1ª corda)
const afinacao = ['E', 'A', 'D', 'G', 'B', 'E']; // Afinação padrão de violão

// Função para calcular a nota da casa com base na corda solta e casa
const calculateNote = (openStringNote: string, fret: number) => {
  const openNoteIndex = notas.indexOf(openStringNote);
  const noteIndex = (openNoteIndex + fret) % notas.length;
  return notas[noteIndex];
};

const App: React.FC = () => {
  const [selectedFrets, setSelectedFrets] = useState<number[]>(Array(numCordas).fill(null));

  const handleCheckboxChange = (stringIndex: number, fret: number) => {
    const newSelectedFrets = [...selectedFrets];
    
    if (newSelectedFrets[stringIndex] === fret) {
      newSelectedFrets[stringIndex] = null;
    } else {
      newSelectedFrets[stringIndex] = fret;
    }

    setSelectedFrets(newSelectedFrets);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '50px'}}>
      <h1>Guitar Chord Finder</h1>
      {/* Loop para gerar as cordas */}
      {Array.from({ length: numCordas}, (_, stringIndex) => (
        <div key={stringIndex} style={{display: 'flex', flexDirection: 'row'}}>
          <label>{stringIndex + 1}st String ({afinacao[stringIndex]}):</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
            {/* Loop para gerar as casas (frets) */}
            {Array.from({ length: numCasas }, (_, fret) => {
              const nota = calculateNote(notas[stringIndex], fret);
              return (
                <label key={fret}>
                  <input
                    type="checkbox"
                    value={fret}
                    checked={selectedFrets[stringIndex] === fret}
                    onChange={() => handleCheckboxChange(stringIndex, fret)}
                  />
                  {fret === 0 ? 'Open' : `${fret}th Fret (${nota})`}
                </label>
              );
            })}
          </div>
        </div>
      ))}
    </div>
  );
};

export default App;