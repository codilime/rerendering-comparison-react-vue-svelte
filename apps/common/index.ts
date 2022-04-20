export const BOARD_SIZE = 3;

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

export function createSquareIndex(rowIndex: number, colIndex: number) {
  return `${rowIndex}x${colIndex}`;
}









export const UPDATE_LEVEL = getSearchParams().updateLevel;
export const MEMO_ENABLED = getSearchParams().memoEnabled;
export const USE_CALLBACK_ENABLED = getSearchParams().useCallbackEnabled;

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

export function toggleMemoEnabled() {
  const currentUrl = new URL(document.location.href);
  currentUrl.searchParams.set('memoEnabled', MEMO_ENABLED ? 'false' : 'true');
  document.location.href = currentUrl.href;
}

export function toggleUseCallbackEnabled() {
  const currentUrl = new URL(document.location.href);
  currentUrl.searchParams.set('useCallbackEnabled', USE_CALLBACK_ENABLED ? 'false' : 'true');
  document.location.href = currentUrl.href;
}

function updateUpdateLevel(level: string) {
  const currentUrl = new URL(document.location.href);
  currentUrl.searchParams.set('updateLevel', level);
  document.location.href = currentUrl.href;
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

const UpdateLevels = ['STATE', 'ARRAY', 'ITEM', 'VALUE'] as const;
type UpdateLevel = typeof UpdateLevels[number];
export type SquareItem = { index: string, value: string };

export type GameState = {
  nextPlayer: 'O' | 'X';
  squares: Array<SquareItem>;
}

(() => {
  if (window.parent !== window) {
    const openInNewPageEl = document.createElement('a');
    openInNewPageEl.setAttribute('href', location.href);
    openInNewPageEl.setAttribute('target', '_blank');
    openInNewPageEl.innerText = 'As new tab ⬈';
    openInNewPageEl.classList.add('open-in-new-tab')
    document.body.appendChild(openInNewPageEl);
  } else {
    const label = document.createElement('label');
    label.classList.add('open-in-new-tab');
    label.innerHTML = 'Update Level ';
    const select = document.createElement('select');
    UpdateLevels.forEach(level => {
      const option = document.createElement('option');
      option.setAttribute('value', level);
      if (level === UPDATE_LEVEL) {
        option.setAttribute('selected', 'selected');
      }
      option.innerHTML = level;
      select.appendChild(option);
    })
    select.addEventListener('change', (event) => {
      // @ts-ignore
      updateUpdateLevel(event.target.value);
    })
    label.appendChild(select);
    document.body.appendChild(label);
  }
})()
