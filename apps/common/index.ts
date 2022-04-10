export const BOARD_SIZE = 3;
export const UPDATE_LEVEL: UpdateLevel = getSearchParams().updateLevel;

/**
 *   {
 *      nextPlayer: 'O',
 *      squares: [
 *        { index: '0x0', value: '' },
 *        { index: '0x1', value: '' },
 *        { index: '0x2', value: '' },
 *        { index: '1x0', value: '' },
 *        …
 *        { index: '2x2', value: '' },
 *      ],
 *   };
 */
export const INITIAL_STATE = createGameState();

function createGameState(): GameState {
  return {
    nextPlayer: 'O',
    squares: [...Array(BOARD_SIZE)].map((_, rowIndex) => {
      return [...Array(BOARD_SIZE)].map((_, colIndex) => ({
        index: createSquareIndex(rowIndex, colIndex),
        value: '',
      }));
    }).flat()
  }
}

export function createSquareIndex(rowIndex: number, squareIndex: number) {
  return `${rowIndex}x${squareIndex}`;
}

type SearchParams = { updateLevel: UpdateLevel, memoEnabled: boolean, useCallbackEnabled: boolean };

export function getSearchParams(): SearchParams {
  const searchParams = new URLSearchParams(location.search);
  return {
    updateLevel: searchParams.get('updateLevel') || 'STATE',
    memoEnabled: JSON.parse(searchParams.get('memoEnabled') || 'false'),
    useCallbackEnabled: JSON.parse(searchParams.get('useCallbackEnabled') || 'false'),
  } as SearchParams
}

function clearLog() {
  const loggerContainer = document.querySelector('.logger-container');
  if (loggerContainer) {
    loggerContainer.querySelectorAll('pre').forEach(pre => {
      if (loggerContainer) {
        loggerContainer.removeChild(pre);
      }
    })
  }
}

function getLoggerContainer() {
  let loggerContainer = document.querySelector('.logger-container');
  if (!loggerContainer) {
    loggerContainer = document.createElement('div');
    loggerContainer.classList.add('logger-container');
    document.body.appendChild(loggerContainer);

    const clearLoggerButton = document.createElement('div');
    clearLoggerButton.innerHTML = '❌'
    clearLoggerButton.classList.add('close-logger-button');
    clearLoggerButton.setAttribute('title', 'Clear Log');
    clearLoggerButton.addEventListener('click', clearLog)
    loggerContainer.appendChild(clearLoggerButton);
  }
  return loggerContainer;
}

export function log(...args: any[]) {
  if (process.env.NODE_ENV !== 'production') {
    const loggerContainer = getLoggerContainer();
    const logLine = document.createElement('pre');
    logLine.innerText = args.join(' ');
    loggerContainer.appendChild(logLine);
    loggerContainer.scrollTop = loggerContainer.scrollHeight;
  }
}

//@ts-ignore
window.addEventListener('message', (event) => {
  try {
    if (event.data.command === 'clearLog') {
      clearLog();
    }
  } catch (e) {
  }
})

type UpdateLevel = 'VALUE' | 'ITEM' | 'ARRAY' | 'STATE';
export type SquareItem = { index: string, value: string };

export type GameState = {
  nextPlayer: 'O' | 'X';
  squares: Array<SquareItem>;
}

(()=>{
  if (window.parent !== window) {
    const openInNewPageEl = document.createElement('a');
    openInNewPageEl.setAttribute('href', location.href);
    openInNewPageEl.setAttribute('target', '_blank');
    openInNewPageEl.innerText = 'Open in new tab';
    Object.assign(openInNewPageEl.style, {
      position: 'fixed',
      top: '10px',
      left: '10px',
    });
    document.body.appendChild(openInNewPageEl);
  }
})()
