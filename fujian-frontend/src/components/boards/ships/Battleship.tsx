import React from 'react';
import ShipHeadSharp from '../../../assets/boats/ship-head-sharp.svg';
import ShipBody from '../../../assets/boats/ship-body.svg';
import ShipHeadRounded from '../../../assets/boats/ship-head-rounded.svg';

import { ISquare } from '../../../redux/types/IMatrix';
import styles from './Battleship.module.scss';

interface Props {
  square: ISquare;
}

const Battleship = ({ square }: Props) => {
  if (square.shipRotation === 90) {
    switch (square.shipPart) {
      case 0:
        return (
          <img
            className={`${styles.battleship__footer} ${
              styles[`battleship__footer--${square.shipRotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-header-sharp"
          />
        );
      case 1:
      case 2:
        return (
          <img
            className={`${styles.battleship__body} ${
              styles[`battleship__body--${square.shipRotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />
        );
      default:
        return (
          <img
            className={`${styles.battleship__header} ${
              styles[`battleship__header--${square.shipRotation}`]
            }`}
            src={ShipHeadSharp}
            alt="ship-header-sharp"
          />
        );
    }
  }
  switch (square.shipPart) {
    case 0:
      return (
        <img
          className={`${styles.battleship__header} ${
            styles[`battleship__header--${square.shipRotation}`]
          }`}
          src={ShipHeadSharp}
          alt="ship-header-sharp"
        />
      );
    case 1:
    case 2:
      return (
        <img
          className={`${styles.battleship__body} ${
            styles[`battleship__body--${square.shipRotation}`]
          }`}
          src={ShipBody}
          alt="ship-header-sharp"
        />
      );
    default:
      return (
        <img
          className={`${styles.battleship__footer} ${
            styles[`battleship__footer--${square.shipRotation}`]
          }`}
          src={ShipHeadRounded}
          alt="ship-header-sharp"
        />
      );
  }
};

export default React.memo(Battleship);
