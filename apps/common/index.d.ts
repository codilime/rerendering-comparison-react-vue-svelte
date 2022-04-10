export declare const BOARD_SIZE = 3;
export declare const UPDATE_LEVEL: UpdateLevel;
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
export declare const INITIAL_STATE: GameState;
export declare function createSquareIndex(rowIndex: number, squareIndex: number): string;
declare type SearchParams = {
    updateLevel: UpdateLevel;
    memoEnabled: boolean;
    useCallbackEnabled: boolean;
};
export declare function getSearchParams(): SearchParams;
export declare function log(...args: any[]): void;
declare type UpdateLevel = 'VALUE' | 'ITEM' | 'ARRAY' | 'STATE';
export declare type SquareItem = {
    index: string;
    value: string;
};
export declare type GameState = {
    nextPlayer: 'O' | 'X';
    squares: Array<SquareItem>;
};
export {};
