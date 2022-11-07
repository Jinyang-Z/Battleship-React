import React from 'react';
import ShipBody from '../../../assets/boats/ship-body.svg';
import ShipHeadRounded from '../../../assets/boats/ship-head-rounded.svg';

import { ISquare } from '../../../redux/types/IMatrix';
import styles from './Carrier.module.scss';

interface Props {
  square: ISquare;
}

const Carrier = ({ square }: Props) => {
  if (square.shipRotation === 90) {
    switch (square.shipPart) {
      case 0:
        return (
          <img
            className={`${styles.carrier__footer} ${
              styles[`carrier__footer--${square.shipRotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-header-sharp"
          />
        );
      case 1:
      case 2:
      case 3:
        return (
          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${square.shipRotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />
        );
      default:
        return (
          <img
            className={`${styles.carrier__header} ${
              styles[`carrier__header--${square.shipRotation}`]
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
          className={`${styles.carrier__header} ${
            styles[`carrier__header--${square.shipRotation}`]
          }`}
          src={ShipHeadRounded}
          alt="ship-header-sharp"
        />
      );
    case 1:
    case 2:
    case 3:
      return (
        <img
          className={`${styles.carrier__body} ${
            styles[`carrier__body--${square.shipRotation}`]
          }`}
          src={ShipBody}
          alt="ship-header-sharp"
        />
      );
    default:
      return (
        <img
          className={`${styles.carrier__footer} ${
            styles[`carrier__footer--${square.shipRotation}`]
          }`}
          src={ShipHeadRounded}
          alt="ship-header-sharp"
        />
      );
  }
};

export default React.memo(Carrier);
