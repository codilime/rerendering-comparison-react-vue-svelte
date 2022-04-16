import { writable } from "svelte/store";
import { INITIAL_STATE, type SquareItem } from "common";

export const createGameStoreLevelArray = () => ({
  gameState: {
    nextPlayer: INITIAL_STATE.nextPlayer,
    squares: writable(INITIAL_STATE.squares),
  },
  onClickItem(clickedSquare: SquareItem) {
    const gameState = this.gameState;

    gameState.squares.update((squares) => {
      return squares.map(square => square === clickedSquare
        ? { ...square, value: gameState.nextPlayer }
        : square
      );
    })
    gameState.nextPlayer = gameState.nextPlayer === 'O' ? 'X' : 'O'
  }
})
