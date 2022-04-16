import { type Writable, writable } from "svelte/store";
import { INITIAL_STATE, type SquareItem } from "common";

export const createGameStoreLevelValue = () => ({
  gameState: {
    nextPlayer: INITIAL_STATE.nextPlayer,
    squares: INITIAL_STATE.squares.map(square => writable(square)),
  },
  onClickItem(clickedSquare: Writable<SquareItem>) {
    const gameState = this.gameState;

    clickedSquare.update(clickedSquare => {
      clickedSquare.value = gameState.nextPlayer
      gameState.nextPlayer = gameState.nextPlayer === 'O' ? 'X' : 'O'
      return clickedSquare;
    })
  }
})
