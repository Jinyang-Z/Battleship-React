import React from 'react';
import Button from 'react-bootstrap/esm/Button';
import SignInCard from '../../components/cards/SignInCard';
import SignInBackground from '../../assets/images/signin-background.svg';
import ArrowLeft from '../../assets/icons/arrow-left.svg';
import styles from './SignIn.module.scss';

const SignIn = () => (
  <div className={styles.signIn}>
    <header className={styles.signIn__header}>
      <Button variant="white" href="/">
        <img
          src={ArrowLeft}
          alt="Return"
          className={styles.signIn__header__img}
        />
      </Button>
      <a className={styles.signIn__header__title} href="/">
        FuJian BattleShip
      </a>
    </header>
    <div className={styles.signIn__content}>
      <SignInCard />
      <img
        src={SignInBackground}
        className={styles.signIn__content__image}
        alt="signin-background"
      />
    </div>
  </div>
);

export default SignIn;
