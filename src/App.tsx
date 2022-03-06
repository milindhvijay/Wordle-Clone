import WordRow from './WordRow';
export default function App() {

  return (
    <div className="mx-auto w-96">
      <header className="border-b border-grey-500 pb-1 my-2">
      <h1 className="text-4xl text-center">Wordle-Clone!</h1>
      </header>

      <main className='grid grid-rows-6 gap-4'>
        <WordRow letters="hello"/>
        <WordRow letters="anime"/>
        <WordRow letters="unity"/>
        <WordRow letters="bread"/>
        <WordRow letters="truck"/>
        <WordRow letters="strip"/>
      </main>
    </div>
  );
}