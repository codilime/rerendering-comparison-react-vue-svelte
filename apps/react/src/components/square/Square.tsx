import React, { FunctionComponent, memo } from 'react';
import { log } from 'common';

export const Square: FunctionComponent<Props> = ({ onClick, item }) => {
  const emitOnClick = () => {
    onClick(item);
  };
  log('[Render]', item.index);
  return <div className="square" onClick={emitOnClick}>{item.value}</div>;
};

export const SquareWithMemo = memo(Square);

export type SquareItem = { index: string, value: string };

type Props = {
  onClick: (item: SquareItem) => void;
  item: SquareItem;
}
