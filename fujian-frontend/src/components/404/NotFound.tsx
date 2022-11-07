import React from 'react';
import { useAppSelector } from '../../hooks/Hooks';
import styles from './NotFound.module.scss';

const NotFound = () => {
  const { isLoggedIn } = useAppSelector(
    (state) => state.auth,
  );

  return (
    <div className={styles.notfound}>
      <div className={styles.container}>
        <div className={styles.container__nf404}>
          <h1 className={styles.container__nf404__h1}>404</h1>
          <h2 className={styles.container__nf404__h2}>Page not found</h2>
        </div>
        <a className={styles.container__a} href={isLoggedIn ? '/rooms' : '/'}>Homepage</a>
      </div>
    </div>
  );
};

export default NotFound;
