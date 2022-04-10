import React from 'react';
import { observer } from 'mobx-react-lite';
import { log } from 'common';

export type SquareItem = { index: string, value: string };

type Props = {
  onClick: (item: SquareItem) => void;
  item: SquareItem;
}

export const Square = observer<Props>(({ onClick, item }) => {
  const emitOnClick = () => {
    onClick(item);
  };
  log('[Render]', item.index);
  return <div className="square" onClick={emitOnClick}>{item.value}</div>;
});
