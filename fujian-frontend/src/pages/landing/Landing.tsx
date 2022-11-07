import React from 'react';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';
import Navbar from '../../components/navbars/Navbar';
import TextCarousel from '../../components/carousels/TextCarousel';
import BattleShip from '../../assets/logos/battleship.svg';
import styles from './Landing.module.scss';

const Landing = () => (
  <div className={styles.landing}>
    <Navbar />
    <section className={styles['landing__section-main']}>
      <div className={styles['landing__section-main__title']}>
        <FormattedMessage id="the-online-naval-combat-game" />
      </div>
      <img
        className={styles['landing__section-main__logo']}
        src={BattleShip}
        alt="battleship-section-main-logo"
      />
      <TextCarousel />
      <div className={styles['landing__section-main__buttons']}>
        <Button variant="dark" size="lg" href="/signup">
          <FormattedMessage id="start-game" />
        </Button>
        <Button variant="info" size="lg" href="/signup">
          <FormattedMessage id="how-to-play" />
        </Button>
      </div>
    </section>
  </div>
);

export default Landing;
