import React, {FunctionComponent, useCallback, useState} from 'react';
import {Square} from './Square';
import {BOARD_SIZE, INITIAL_STATE, log, SquareItem, UPDATE_LEVEL,} from 'common';

export const GameBoardUseState: FunctionComponent = () => {

  const [gameState, setGameState] = useState(INITIAL_STATE);

  const onSquareClick = (clickedSquare: SquareItem) => {
    log('--- onSquareClick ---');
    setGameState(gameState => {
      return {
        squares: gameState.squares.map(square => square === clickedSquare
          ? {...square, value: gameState.nextPlayer}
          : square
        ),
        nextPlayer: gameState.nextPlayer === 'O' ? 'X' : 'O',
      };
    });
  };

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
      {gameState.squares.map(square => <Square
        key={square.index}
        onClick={onSquareClick}
        item={square}
      />)}
    </div>
  </>;
};