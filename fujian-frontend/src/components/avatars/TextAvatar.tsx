import React from 'react';
import Button from 'react-bootstrap/Button';
import styles from './TextAvatar.module.scss';

interface Props {
  label: string;
}

const TextAvatar = ({ label }: Props) => (
  <Button variant="dark" className={styles['text-avatar']}>
    <p className={styles['text-avatar__label']}>{label}</p>
  </Button>
);

export default React.memo(TextAvatar);
