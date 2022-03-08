import { describe, expect, it } from 'vitest'
import App from './App'
import { render, screen, userEvent } from './utils/test-utils'
import { useStore } from './store';

describe('Simple working test', () => {
  it('the title is visible', () => {
    render(<App />)
    expect(screen.getByText(/Wordle-Clone/i)).toBeInTheDocument()
  })

  it('shows empty state', () => {
    useStore.getState().newGame([])
    render(<App />)

    expect(screen.queryByText('Game Over')).toBeNull()
    expect(document.querySelectorAll('main div')).toHaveLength(6)
    expect(document.querySelector('main')?.textContent).toEqual('')
  })

  it('shows one row of guesses', () => {
    useStore.getState().newGame(['hello'])
    render(<App />)

    expect(document.querySelector('main')?.textContent).toEqual('hello')
  })

  it('shows lost game over state', () => {
    useStore.getState().newGame(Array(6).fill('hello'))
    render(<App />)

    // @ts-expect-error
    expect(screen.getByText('Game Over!')).toBeInTheDocument()
  })

  it('shows won game over state', () => {
    useStore.getState().newGame(Array(2).fill('hello'))
    const answer = useStore.getState().answer
    useStore.getState().addGuess(answer)
    render(<App />)

    // @ts-expect-error
    expect(screen.getByText('Game Over!')).toBeInTheDocument()
  })

  it('can start a new game', () => {
    useStore.getState().newGame(Array(6).fill('hello'))
    render(<App />)

    // @ts-expect-error
    expect(screen.getByText('Game Over!')).toBeInTheDocument()
    userEvent.click(screen.getByText('New Game'))
    expect(document.querySelector('main')?.textContent).toEqual('')
  })


})
