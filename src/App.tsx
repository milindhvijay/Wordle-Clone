import { useEffect, useRef, useState } from 'react';
import { useStore, GUESS_LENGTH } from './store';
import { LETTER_LENGTH } from './word-utils';
import WordRow from './WordRow';

export default function App() {
  const state = useStore()
  const [guess, setGuess] = useGuess()

  let rows = [...state.rows]

  if (rows.length < GUESS_LENGTH) {
    rows.push({ guess })
  }

  const numberOfGuessesRemaining = GUESS_LENGTH - rows.length

  rows = rows.concat(Array(numberOfGuessesRemaining).fill(''))

  const isGameOver = state.gameState !== 'playing'


  return (
    <div className="mx-auto w-96 relative">
      <header className="border-b border-grey-500 pb-1 my-2">
        <h1 className="text-4xl text-center">Wordle-Clone!</h1>
      </header>

      <main className='grid grid-rows-6 gap-4'>
        {rows.map(({ guess, result }, index) => (
          <WordRow key={index} letters={guess} result={result} />
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

function useGuess(): [string, React.Dispatch<React.SetStateAction<string>>] {
  const addGuess = useStore(s => s.addGuess)
  const [guess, setGuess] = useState('')
  const previousGuess = usePrevious(guess)

  const onKeyDown = (e: KeyboardEvent) => {
    let letter = e.key
    setGuess((currGuess) => {
      const newGuess = letter.length === 1 ? currGuess + letter : currGuess

      switch (letter) {
        case 'Backspace':
          return newGuess.slice(0, -1)
        case 'Enter':
          if (newGuess.length === LETTER_LENGTH) {
            return ''
          }
      }

      if (currGuess.length === LETTER_LENGTH) {
        return currGuess
      }
      return newGuess
    })
  }

  useEffect(() => {
    document.addEventListener('keydown', onKeyDown)
    return () => {
      document.removeEventListener('keydown', onKeyDown)
    }
  }, [])

  useEffect(() => {
    if (guess.length === 0 && previousGuess?.length === LETTER_LENGTH) {
      addGuess(previousGuess)
    }
  }, [guess])

  return [guess, setGuess]
}

function usePrevious<T>(value: T): T {
  const ref: any = useRef<T>()

  useEffect(() => {
    ref.current = value
  }, [value])

  return ref.current
}
