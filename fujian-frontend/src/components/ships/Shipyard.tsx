import React from 'react';

import Cruiser from './Cruiser';
import Destroyer from './Destroyer';
import Submarine from './Submarine';
import Battleship from './Battleship';
import Carrier from './Carrier';
import styles from './Shipyard.module.scss';

interface Props {
  rotation: '0' | '90' | '180' | '270' | '360';
}

const Shipyard = ({ rotation }: Props) => (
  <div className={styles.shipyard}>
    <div className={styles.shipyard__header}>
      <p className={styles.shipyard__header__label}>Shipyard</p>
    </div>
    <div className={styles.shipyard__body}>
      <div className={styles.shipyard__body__header}>
        <Cruiser rotation={rotation} />
        <Destroyer rotation={rotation} />
        <Submarine rotation={rotation} />
      </div>
      <div className={styles.shipyard__body__footer}>
        <Battleship rotation={rotation} />
        <Carrier rotation={rotation} />
      </div>
    </div>
  </div>
);

export default React.memo(Shipyard);
