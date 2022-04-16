import React, { FunctionComponent } from 'react';
import { observer, useLocalObservable } from 'mobx-react-lite';
import { BOARD_SIZE, INITIAL_STATE, log, UPDATE_LEVEL } from 'common';
import { Square, SquareItem } from './Square';

export const GameBoardMobX: FunctionComponent = observer(() => {
  const store = useLocalObservable(() => ({

    gameState: INITIAL_STATE,

    onSquareClick: (clickedSquare: SquareItem) => {
      log('--- onSquareClick ---');
      const gameState = store.gameState;

      switch (UPDATE_LEVEL) {
        case 'VALUE': {
          clickedSquare.value = gameState.nextPlayer;
          gameState.nextPlayer = gameState.nextPlayer === 'O' ? 'X' : 'O';
          break;
        }

        case 'ITEM': {
          const clickedSquareArrayIndex = gameState.squares
            .findIndex(square => square.index === clickedSquare.index);

          gameState.squares[clickedSquareArrayIndex] = {
            index: clickedSquare.index,
            value: gameState.nextPlayer,
          };

          // or
          // gameState.squares.splice(clickedSquareArrayIndex, 1, {
          //   index: clickedSquare.index,
          //   value: gameState.nextPlayer,
          // });

          gameState.nextPlayer = gameState.nextPlayer === 'O' ? 'X' : 'O';
          break;
        }

        case 'ARRAY': {
          gameState.squares = gameState.squares.map(square =>
            square === clickedSquare
              ? { ...square, value: gameState.nextPlayer }
              : square
          );
          gameState.nextPlayer = gameState.nextPlayer === 'O' ? 'X' : 'O';
          break;
        }

        case 'STATE': {
          store.gameState = {
            squares: gameState.squares.map(square =>
              square === clickedSquare
                ? { ...square, value: gameState.nextPlayer }
                : square
            ),
            nextPlayer: gameState.nextPlayer === 'O' ? 'X' : 'O',
          };
          break;
        }
      }
    },
  }));

  log('[Render] GameBoard');

  const { gameState } = store;

  return <div className="game-board"
              style={{
                gridTemplateColumns: `repeat(${BOARD_SIZE}, 40px)`,
                gridTemplateRows: `repeat(${BOARD_SIZE}, 40px)`,
              }}>
    {gameState.squares.map(square => <Square
      key={square.index}
      onClick={store.onSquareClick}
      item={square}
    />)}
  </div>;
});
