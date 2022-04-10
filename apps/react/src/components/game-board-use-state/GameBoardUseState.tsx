import React, { FunctionComponent, useCallback, useState } from 'react';
import { Square, SquareItem, SquareWithMemo } from '../square/Square';
import { BOARD_SIZE, getSearchParams, INITIAL_STATE, log, UPDATE_LEVEL } from 'common';

const shouldWrapMemo = getSearchParams().memoEnabled;
const shouldWrapUseCallback = getSearchParams().useCallbackEnabled;

export const GameBoardUseState: FunctionComponent = () => {
  document.title = 'useState'
  const [gameState, setGameState] = useState(INITIAL_STATE);

  const onSquareClick = (clickedSquare: SquareItem) => {
    log('--- onSquareClick ---');
    setGameState(gameState => {
      return {
        squares: gameState.squares.map(square => square === clickedSquare ? {
          ...square,
          value: gameState.nextPlayer,
        } : square),
        nextPlayer: gameState.nextPlayer === 'O' ? 'X' : 'O',
      };
    });
  };
  const onSquareClickWithUseCallback = useCallback(onSquareClick, [setGameState]);

  if (UPDATE_LEVEL !== 'STATE') {
    return <section>
      <h1>React <span className="version">18.0.0</span> / useState</h1>
      <div className="not-possible">
        <a href="https://beta.reactjs.org/apis/usestate#updating-objects-and-arrays-in-state" target="_blank" rel="noreferrer">
          Need to create whole state always
        </a>
      </div>
    </section>;
  }

  log('[Render] GameBoard');

  const SquareComponent = shouldWrapMemo ? SquareWithMemo : Square;
  const onClickCallback = shouldWrapUseCallback ? onSquareClickWithUseCallback : onSquareClick;

  return <section>
    <h1>React <span className="version">18.0.0</span> / useState</h1>

    <div className="game-board"
         style={{
           gridTemplateColumns: `repeat(${BOARD_SIZE}, 40px)`,
           gridTemplateRows: `repeat(${BOARD_SIZE}, 40px)`,
         }}>
      {gameState.squares.map(square => <SquareComponent
        key={square.index}
        onClick={onClickCallback}
        item={square}
      />)}
    </div>

    <div>
      <label style={{ marginTop: 20, display: 'block' }}>
        <input type="checkbox" checked={shouldWrapMemo} onChange={toggleMemoWrapper}/>
        memo(Square)
      </label>

      <label style={{ marginTop: 20, display: 'block' }}>
        <input type="checkbox" checked={shouldWrapUseCallback} onChange={toggleUseCallbackWrapper}/>
        useCallback(onSquareClick)
      </label>
    </div>


  </section>;
};

function toggleMemoWrapper() {
  const currentUrl = new URL(document.location.href);
  currentUrl.searchParams.set('memoEnabled', shouldWrapMemo ? 'false' : 'true');
  document.location.href = currentUrl.href;
}

function toggleUseCallbackWrapper() {
  const currentUrl = new URL(document.location.href);
  currentUrl.searchParams.set('useCallbackEnabled', shouldWrapUseCallback ? 'false' : 'true');
  document.location.href = currentUrl.href;
}