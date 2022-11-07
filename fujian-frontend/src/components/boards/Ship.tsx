import React from 'react';
import ShipsEnum from '../../enums/ShipsEnum';

import { ISquare } from '../../redux/types/IMatrix';
import Cruiser from './ships/Cruiser';
import Destroyer from './ships/Destroyer';
import Submarine from './ships/Submarine';
import Battleship from './ships/Battleship';
import Carrier from './ships/Carrier';

interface Props {
  square: ISquare;
}

const Ship = ({ square }: Props) => {
  if (!square.isEmpty) {
    switch (square.shipType) {
      case ShipsEnum.CRUISER:
        return <Cruiser square={square} />;
      case ShipsEnum.DESTROYER:
        return <Destroyer square={square} />;
      case ShipsEnum.SUBMARINE:
        return <Submarine square={square} />;
      case ShipsEnum.BATTLESHIP:
        return <Battleship square={square} />;
      case ShipsEnum.CARRIER:
        return <Carrier square={square} />;
      default:
        break;
    }
  }
  return null;
};

export default React.memo(Ship);
