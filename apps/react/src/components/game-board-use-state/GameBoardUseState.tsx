import React, { FunctionComponent, useCallback, useState } from 'react';
import { Square, SquareItem, SquareWithMemo } from '../square/Square';
import {
  BOARD_SIZE,
  INITIAL_STATE,
  log,
  MEMO_ENABLED,
  toggleMemoEnabled,
  toggleUseCallbackEnabled,
  UPDATE_LEVEL,
  USE_CALLBACK_ENABLED,
} from 'common';

export const GameBoardUseState: FunctionComponent = () => {

  const [gameState, setGameState] = useState(INITIAL_STATE);

  const onSquareClick = (clickedSquare: SquareItem) => {
    log('--- onSquareClick ---');
    setGameState(gameState => {
      return {
        squares: gameState.squares.map(square => square === clickedSquare
          ? { ...square, value: gameState.nextPlayer }
          : square
        ),
        nextPlayer: gameState.nextPlayer === 'O' ? 'X' : 'O',
      };
    });
  };
  const onSquareClickWrapped = useCallback(onSquareClick, [setGameState]);

  const SquareComponent = MEMO_ENABLED ? SquareWithMemo : Square;
  const onClick = USE_CALLBACK_ENABLED ? onSquareClickWrapped : onSquareClick;

  if (UPDATE_LEVEL !== 'STATE') {
    return <div className="not-possible">
      <a href="https://beta.reactjs.org/apis/usestate#updating-objects-and-arrays-in-state" target="_blank"
         rel="noreferrer">
        Need to create whole state always
      </a>
    </div>;
  }

  log('[Render] GameBoard');

  return <>
    <div className="game-board"
         style={{
           gridTemplateColumns: `repeat(${BOARD_SIZE}, 40px)`,
           gridTemplateRows: `repeat(${BOARD_SIZE}, 40px)`,
         }}>
      {gameState.squares.map(square => <SquareComponent
        key={square.index}
        onClick={onClick}
        item={square}
      />)}
    </div>

    <div>
      <label style={{ marginTop: 20, display: 'block' }}>
        <input type="checkbox" checked={MEMO_ENABLED} onChange={toggleMemoEnabled}/>
        memo(Square)
      </label>

      <label style={{ marginTop: 20, display: 'block' }}>
        <input type="checkbox" checked={USE_CALLBACK_ENABLED} onChange={toggleUseCallbackEnabled}/>
        useCallback(onSquareClick)
      </label>
    </div>
  </>;
};