import React from 'react';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';
import FlagDropdown from '../dropdowns/FlagDropdown';
import BattleShipLogo from '../../assets/logos/battleship.svg';
import styles from './Navbar.module.scss';

const Navbar = () => (
  <nav className={styles.navbar}>
    <a className={styles.navbar__brand} href="/">
      <img
        src={BattleShipLogo}
        alt="battleship-logo"
        width="38"
        height="24"
        className="d-inline-block align-text-top"
      />
      <p className={styles.navbar__brand__name}>FuJian BattleShip</p>
    </a>
    <div className={styles.navbar__buttons}>
      <Button variant="dark" href="/signin">
        <FormattedMessage id="signin" />
      </Button>
      <Button variant="dark" href="/signup">
        <FormattedMessage id="signup" />
      </Button>
      <FlagDropdown />
    </div>
  </nav>
);

export default React.memo(Navbar);
