import React from 'react';
import { useNavigate } from 'react-router-dom';
import Button from 'react-bootstrap/Button';

import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import { signout } from '../../redux/slices/AuthSlice';

import FlagDropdown from '../dropdowns/FlagDropdown';
import TextAvatar from '../avatars/TextAvatar';
import BattleShipLogo from '../../assets/logos/battleship.svg';
import PowerLogo from '../../assets/icons/power.svg';
import styles from './UserNavbar.module.scss';

const UserNavbar = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);

  const handleSignOut = () => {
    dispatch(signout());
    navigate('/');
  };

  return (
    <nav className={styles['user-navbar']}>
      <div className={styles['user-navbar__brand']}>
        <img
          src={BattleShipLogo}
          alt="battleship-logo"
          width="38"
          height="24"
          className="d-inline-block align-text-top"
        />
        <p className={styles['user-navbar__brand__name']}>FuJian BattleShip</p>
      </div>
      <div className={styles['user-navbar__buttons']}>
        <FlagDropdown />
        <TextAvatar label={user ? user.pseudo.substring(0, 2) : 'NaN'} />
        <Button
          className={styles['user-navbar__buttons__signout']}
          variant="danger"
          type="button"
          onClick={handleSignOut}
        >
          <img src={PowerLogo} alt="power-logo" />
        </Button>
      </div>
    </nav>
  );
};

export default React.memo(UserNavbar);
