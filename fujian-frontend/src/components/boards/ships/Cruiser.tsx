import React from 'react';
import ShipHeadSharp from '../../../assets/boats/ship-head-sharp.svg';
import ShipHeadRounded from '../../../assets/boats/ship-head-rounded.svg';

import { ISquare } from '../../../redux/types/IMatrix';
import styles from './Cruiser.module.scss';

interface Props {
  square: ISquare;
}

const Cruiser = ({ square }: Props) => {
  if (square.shipRotation === 90 || square.shipRotation === 270) {
    switch (square.shipPart) {
      case 0:
        return (
          <img
            className={`${styles.cruiser__footer} ${
              styles[`cruiser__footer--${square.shipRotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-header-sharp"
          />
        );
      default:
        return (
          <img
            className={`${styles.cruiser__header} ${
              styles[`cruiser__header--${square.shipRotation}`]
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
          className={`${styles.cruiser__header} ${
            styles[`cruiser__header--${square.shipRotation}`]
          }`}
          src={ShipHeadSharp}
          alt="ship-header-sharp"
        />
      );
    default:
      return (
        <img
          className={`${styles.cruiser__footer} ${
            styles[`cruiser__footer--${square.shipRotation}`]
          }`}
          src={ShipHeadRounded}
          alt="ship-header-sharp"
        />
      );
  }
};

export default React.memo(Cruiser);
