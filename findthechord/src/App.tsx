import React, { useState } from 'react';

const NUMERO_CORDAS = 6;
const NUMERO_CASAS = 25;

// Sequência de NOTAS
const NOTAS = ['A', 'A#', 'B', 'C', 'C#', 'D', 'D#', 'E', 'F', 'F#', 'G', 'G#'];

// NOTAS das cordas soltas (6ª a 1ª corda)
const AFINACAO = ['E', 'A', 'D', 'G', 'B', 'E']; // Afinação padrão de violão

// Função para calcular a nota da casa com base na corda solta e casa
const calculaNota = (notaAfinacao: string, traste: number) => {
  const opennotaIndex = NOTAS.indexOf(notaAfinacao);
  const notaIndex = (opennotaIndex + traste) % NOTAS.length;
  return NOTAS[notaIndex];
};

const App: React.FC = () => {
  const [selectedtrastes, setSelectedtrastes] = useState<number[]>(Array(NUMERO_CORDAS).fill(null));

  const handleCheckboxChange = (stringIndex: number, traste: number) => {
    const newSelectedtrastes = [...selectedtrastes];
    
    if (newSelectedtrastes[stringIndex] === traste) {
      newSelectedtrastes[stringIndex] = null;
    } else {
      newSelectedtrastes[stringIndex] = traste;
    }

    setSelectedtrastes(newSelectedtrastes);
  };

  return (
    <div style={{display: 'flex', flexDirection: 'column', gap: '50px'}}>
      <h1>Guitar Chord Finder</h1>
      {/* Loop para gerar as cordas */}
      {Array.from({ length: NUMERO_CORDAS}, (_, stringIndex) => (
        <div key={stringIndex} style={{display: 'flex', flexDirection: 'row'}}>
          <label>{stringIndex + 1}st String ({AFINACAO[stringIndex]}):</label>
          <div style={{ display: 'flex', gap: '10px', flexWrap: 'nowrap' }}>
            {/* Loop para gerar as casas (trastes) */}
            {Array.from({ length: NUMERO_CASAS }, (_, traste) => {
              const nota = calculaNota(AFINACAO[stringIndex], traste); // Corrigido aqui
              return (
                <label key={traste}>
                  <input
                    type="checkbox"
                    value={traste}
                    checked={selectedtrastes[stringIndex] === traste}
                    onChange={() => handleCheckboxChange(stringIndex, traste)}
                  />
                  {traste === 0 ? 'tt' : `${traste}th traste (${nota})`}
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
