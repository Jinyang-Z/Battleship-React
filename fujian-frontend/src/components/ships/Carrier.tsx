import React from 'react';
import { useDrag } from 'react-dnd';
import ShipsEnum from '../../enums/ShipsEnum';
import ShipBody from '../../assets/boats/ship-body.svg';
import ShipHeadRounded from '../../assets/boats/ship-head-rounded.svg';
import styles from './Carrier.module.scss';

interface Props {
  rotation: '0' | '90' | '180' | '270' | '360';
}

const Carrier = ({ rotation }: Props) => {
  const [{ isDragging }, drag] = useDrag(() => ({
    type: ShipsEnum.CARRIER,
    collect: (monitor) => ({
      isDragging: !!monitor.isDragging(),
    }),
  }));

  return (
    <div className={`${styles.carrier} ${styles[`carrier--${rotation}`]}`}>
      {rotation === '0' && (
        <div
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
          }}
        >
          <img
            className={`${styles.carrier__header} ${
              styles[`carrier__header--${rotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-header-sharp"
          />
          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${rotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />
          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${rotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />
          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${rotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />
          <img
            className={`${styles.carrier__footer} ${
              styles[`carrier__footer--${rotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-header-sharp"
          />
        </div>
      )}
      {rotation === '90' && (
        <div
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
          }}
        >
          <img
            className={`${styles.carrier__footer} ${
              styles[`carrier__footer--${rotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-footer-sharp"
          />
          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${rotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />
          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${rotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />

          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${rotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />

          <img
            className={`${styles.carrier__header} ${
              styles[`carrier__header--${rotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-header-sharp"
          />
        </div>
      )}
      {rotation === '180' && (
        <div
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
          }}
        >
          <img
            className={`${styles.carrier__footer} ${
              styles[`carrier__footer--${rotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-footer-sharp"
          />
          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${rotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />
          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${rotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />

          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${rotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />

          <img
            className={`${styles.carrier__header} ${
              styles[`carrier__header--${rotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-header-sharp"
          />
        </div>
      )}

      {rotation === '270' && (
        <div
          ref={drag}
          style={{
            opacity: isDragging ? 0.5 : 1,
            fontSize: 25,
            fontWeight: 'bold',
            cursor: 'move',
          }}
        >
          <img
            className={`${styles.carrier__header} ${
              styles[`carrier__header--${rotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-header-sharp"
          />
          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${rotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />
          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${rotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />
          <img
            className={`${styles.carrier__body} ${
              styles[`carrier__body--${rotation}`]
            }`}
            src={ShipBody}
            alt="ship-header-sharp"
          />

          <img
            className={`${styles.carrier__footer} ${
              styles[`carrier__footer--${rotation}`]
            }`}
            src={ShipHeadRounded}
            alt="ship-footer-sharp"
          />
        </div>
      )}
    </div>
  );
};

export default React.memo(Carrier);
