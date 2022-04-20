export declare const BOARD_SIZE = 3;
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
export declare function createSquareIndex(rowIndex: number, colIndex: number): string;
export declare const UPDATE_LEVEL: "STATE" | "ARRAY" | "ITEM" | "VALUE";
export declare const MEMO_ENABLED: boolean;
export declare const USE_CALLBACK_ENABLED: boolean;
declare type SearchParams = {
    updateLevel: UpdateLevel;
    memoEnabled: boolean;
    useCallbackEnabled: boolean;
};
export declare function getSearchParams(): SearchParams;
export declare function log(...args: any[]): void;
export declare function toggleMemoEnabled(): void;
export declare function toggleUseCallbackEnabled(): void;
declare const UpdateLevels: readonly ["STATE", "ARRAY", "ITEM", "VALUE"];
declare type UpdateLevel = typeof UpdateLevels[number];
export declare type SquareItem = {
    index: string;
    value: string;
};
export declare type GameState = {
    nextPlayer: 'O' | 'X';
    squares: Array<SquareItem>;
};
export {};
