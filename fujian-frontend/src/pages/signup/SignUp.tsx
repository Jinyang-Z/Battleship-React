import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/esm/Button';

import { useAppSelector } from '../../hooks/Hooks';
import SignUpCard from '../../components/cards/SignUpCard';
import toastify from '../../components/toastify/Toastify';

import SignUpBackground from '../../assets/images/signup-background.svg';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import styles from './SignUp.module.scss';

const SignUp = () => {
  const navigate = useNavigate();
  const { isLoggedIn } = useAppSelector((state) => state.auth);

  useEffect(() => {
    if (isLoggedIn) {
      toastify({ type: 'success', message: 'Welcome !' });
      navigate('/rooms');
    }
  }, [navigate, isLoggedIn]);

  return (
    <div className={styles.signUp}>
      <header className={styles.signUp__header}>
        <Button variant="white" href="/">
          <img
            src={ArrowLeft}
            alt="Return"
            className={styles.signUp__header__img}
          />
        </Button>
        <a className={styles.signUp__header__title} href="/">
          FuJian BattleShip
        </a>
      </header>
      <div className={styles.signUp__content}>
        <SignUpCard />
        <img
          className={styles.signUp__content__image}
          src={SignUpBackground}
          alt="signup-background"
        />
      </div>
    </div>
  );
};

export default SignUp;
