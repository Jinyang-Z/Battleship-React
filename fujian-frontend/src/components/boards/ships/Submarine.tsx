import React from 'react';
import ShipBody from '../../../assets/boats/ship-body.svg';
import ShipHeadRounded from '../../../assets/boats/ship-head-rounded.svg';
import { ISquare } from '../../../redux/types/IMatrix';
import styles from './Submarine.module.scss';

interface Props {
  square: ISquare;
}

const Submarine = ({ square }: Props) => {
  if (square.shipRotation === 90) {
    switch (square.shipPart) {
      case 0:
        return (
          <img
            className={`${styles.submarine__footer} ${
              styles[`submarine__footer--${square.shipRotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-header-sharp"
          />
        );
      case 1:
        return (
          <img
            className={`${styles.submarine__body} ${
              styles[`submarine__body--${square.shipRotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />
        );
      default:
        return (
          <img
            className={`${styles.submarine__header} ${
              styles[`submarine__header--${square.shipRotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-header-sharp"
          />
        );
    }
  }
  switch (square.shipPart) {
    case 0:
      return (
        <img
          className={`${styles.submarine__header} ${
            styles[`submarine__header--${square.shipRotation}`]
          }`}
          src={ShipHeadRounded}
          alt="ship-header-sharp"
        />
      );
    case 1:
      return (
        <img
          className={`${styles.submarine__body} ${
            styles[`submarine__body--${square.shipRotation}`]
          }`}
          src={ShipBody}
          alt="ship-header-sharp"
        />
      );
    default:
      return (
        <img
          className={`${styles.submarine__footer} ${
            styles[`submarine__footer--${square.shipRotation}`]
          }`}
          src={ShipHeadRounded}
          alt="ship-header-sharp"
        />
      );
  }
};

export default React.memo(Submarine);
