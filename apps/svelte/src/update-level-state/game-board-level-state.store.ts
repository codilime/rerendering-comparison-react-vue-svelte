import { writable } from "svelte/store";
import { INITIAL_STATE, type SquareItem } from "common";

export const createGameStoreLevelState = () => ({
  state: writable({
    nextPlayer: INITIAL_STATE.nextPlayer,
    squares: INITIAL_STATE.squares,
  }),
  onClickItem(clickedSquare: SquareItem) {
    this.state.update(state => ({
      ...state,
      squares: state.squares.map(square => square === clickedSquare ? {
        ...square,
        value: state.nextPlayer,
      } : square),
      nextPlayer: state.nextPlayer === 'O' ? 'X' : 'O'
    }));
  }
})
