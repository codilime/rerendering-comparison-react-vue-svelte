import React, {FunctionComponent, memo} from 'react';
import { log, SquareItem } from 'common';

export const Square: FunctionComponent<Props> = ({ onClick, item }) => {
  const emitOnClick = () => {
    onClick(item);
  };
  log('[Render]', item.index);
  return <div className="square" onClick={emitOnClick}>{item.value}</div>;
};

type Props = {
  onClick: (item: SquareItem) => void;
  item: SquareItem;
}
