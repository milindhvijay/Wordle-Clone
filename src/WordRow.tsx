import { LetterState, LETTER_LENGTH } from './word-utils';


interface WordRowProps {
  letters: string
  result?: LetterState[]
  className?: string
}

export default function WordRow({ letters: lettersProp = '', result = [], className = '' }: WordRowProps) {
  const lettersRemaining = LETTER_LENGTH - lettersProp.length
  const letters = lettersProp
    .split('')
    .concat(Array(lettersRemaining).fill(''))

  return (
    <div className={`grid grid-cols-5 gap-4 ${className}`}>
      {letters.map((char, index) => (
        <CharacterBox key={index} value={char} state={result[index]} />
      ))}
    </div>
  )
}

interface CharacterBoxProps {
  value: string
  state?: LetterState
}
function CharacterBox({ value, state }: CharacterBoxProps) {
  //console.log(state)
  const stateStyles = state == null ? '' : characterStateStyles[state]

  return (
    <span className={`inline-block border-2 border-gray-500 p-4 font-bold before:inline-block before:content-['_'] 
    uppercase text-center text-2xl ${stateStyles}`}
    >{value}</span>
  )
}

const characterStateStyles = {
  [LetterState.Miss]: 'bg-gray-500 border-gray-500',
  [LetterState.Present]: 'bg-yellow-500 border-yellow-500',
  [LetterState.Match]: 'bg-green-500 border-green-500',
}