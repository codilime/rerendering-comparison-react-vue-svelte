import { writable } from "svelte/store";
import { INITIAL_STATE, type SquareItem } from "common";

export const createGameStoreLevelState = () => ({
  gameState: writable({
    nextPlayer: INITIAL_STATE.nextPlayer,
    squares: INITIAL_STATE.squares,
  }),
  onClickItem(clickedSquare: SquareItem) {
    this.gameState.update(gameState => ({
      ...gameState,
      squares: gameState.squares.map(square => square === clickedSquare
        ? { ...square, value: gameState.nextPlayer }
        : square
      ),
      nextPlayer: gameState.nextPlayer === 'O' ? 'X' : 'O'
    }));
  }
})
