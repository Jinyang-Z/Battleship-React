import React from 'react';
import Spinner from 'react-bootstrap/Spinner';
import styles from './Loading.module.scss';

interface Props {
  label: string;
}

const Loading = ({ label }: Props) => (
  <div className={styles.loading}>
    <p className={styles.loading__label}>{label}</p>
    <Spinner animation="grow" />
  </div>
);

export default React.memo(Loading);
