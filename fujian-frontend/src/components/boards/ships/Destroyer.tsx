import React from 'react';
import ShipHeadSharp from '../../../assets/boats/ship-head-sharp.svg';
import ShipBody from '../../../assets/boats/ship-body.svg';
import ShipHeadRounded from '../../../assets/boats/ship-head-rounded.svg';
import { ISquare } from '../../../redux/types/IMatrix';
import styles from './Destroyer.module.scss';

interface Props {
  square: ISquare;
}

const Destroyer = ({ square }: Props) => {
  if (square.shipRotation === 90) {
    switch (square.shipPart) {
      case 0:
        return (
          <img
            className={`${styles.destroyer__footer} ${
              styles[`destroyer__footer--${square.shipRotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-header-sharp"
          />
        );
      case 1:
        return (
          <img
            className={`${styles.destroyer__body} ${
              styles[`destroyer__body--${square.shipRotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />
        );
      default:
        return (
          <img
            className={`${styles.destroyer__header} ${
              styles[`destroyer__header--${square.shipRotation}`]
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
          className={`${styles.destroyer__header} ${
            styles[`destroyer__header--${square.shipRotation}`]
          }`}
          src={ShipHeadSharp}
          alt="ship-header-sharp"
        />
      );
    case 1:
      return (
        <img
          className={`${styles.destroyer__body} ${
            styles[`destroyer__body--${square.shipRotation}`]
          }`}
          src={ShipBody}
          alt="ship-header-sharp"
        />
      );
    default:
      return (
        <img
          className={`${styles.destroyer__footer} ${
            styles[`destroyer__footer--${square.shipRotation}`]
          }`}
          src={ShipHeadRounded}
          alt="ship-header-sharp"
        />
      );
  }
};

export default React.memo(Destroyer);
