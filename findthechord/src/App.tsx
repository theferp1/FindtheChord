import React, { useState } from 'react';

const TOTAL_STRINGS = 6;
const TOTAL_FRETS = 24;

// Sequência de notas
const NOTES = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

// Notas das cordas soltas (6ª a 1ª corda)
const OPEN_STRING_NOTES = ['E', 'A', 'D', 'G', 'B', 'E']; // Afinação padrão de violão

// Função para calcular a nota da casa com base na corda solta e casa
const calculateNote = (openStringNote: string, fret: number) => {
  const openNoteIndex = NOTES.indexOf(openStringNote);
  const noteIndex = (openNoteIndex + fret) % NOTES.length;
  return NOTES[noteIndex];
};

const App: React.FC = () => {
  const [selectedFrets, setSelectedFrets] = useState<number[]>(Array(TOTAL_STRINGS).fill(null));

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
    <div>
      <h1>Guitar Chord Finder</h1>
      {/* Loop para gerar as cordas */}
      {Array.from({ length: TOTAL_STRINGS }, (_, stringIndex) => (
        <div key={stringIndex}>
          <label>{stringIndex + 1}st String ({OPEN_STRING_NOTES[stringIndex]}):</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'wrap' }}>
            {/* Loop para gerar as casas (frets) */}
            {Array.from({ length: TOTAL_FRETS }, (_, fret) => {
              const note = calculateNote(OPEN_STRING_NOTES[stringIndex], fret);
              return (
                <label key={fret}>
                  <input
                    type="checkbox"
                    value={fret}
                    checked={selectedFrets[stringIndex] === fret}
                    onChange={() => handleCheckboxChange(stringIndex, fret)}
                  />
                  {fret === 0 ? 'Open' : `${fret}th Fret (${note})`}
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
