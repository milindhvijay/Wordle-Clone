import { useState } from 'react';
import { useStore } from './store';
import { LETTER_LENGTH } from './word-utils';
import WordRow from './WordRow';

const GUESS_LENGTH = 6
export default function App() {
  const state = useStore()
  const [guess, setGuess] = useState('')

  const onChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newGuess = e.target.value

    if (newGuess.length === LETTER_LENGTH) {
      state.addGuess(newGuess)
      setGuess('')
      return
    }
    setGuess(newGuess)
  }

  let rows = [...state.rows]

  if (rows.length < GUESS_LENGTH) {
    rows.push({ guess })
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(''))

  const isGameOver = state.rows.length === GUESS_LENGTH

  
  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-grey-500 pb-1 my-2">
      <h1 className="text-4xl text-center">Wordle-Clone!</h1>

      <div>
        <input type="text" className="w-half p-2 border-2 border-gray-500" value={guess} onChange={onChange} disabled={isGameOver} />
      </div>
      </header>

      <main className='grid grid-rows-6 gap-4'>
        {rows.map(({guess, result}, index) =>(
          <WordRow key = {index} letters={guess} result={result} />
        ))}
      </main>

      {isGameOver && (
        <div role="modal" className="absolute bg-white left-0 right-0 top-1/4 p-6 w-3/4 mx-auto rounded border border-gray-800 text-center">
          Game Over!

          <button
            className="block border rounded border-green-500 bg-green-500 p-2 mt-4 mx-auto shadow" 
            onClick={() => {
              state.newGame()
              setGuess('')
            }}
          >
            New Game
          </button>
        </div>
      )}
    </div>
  );
}