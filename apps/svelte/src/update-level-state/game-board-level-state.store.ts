import { writable } from "svelte/store";
import { INITIAL_STATE, type SquareItem } from "common";

export const createGameStoreLevelState = () => ({
  gameState: writable(INITIAL_STATE),
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
