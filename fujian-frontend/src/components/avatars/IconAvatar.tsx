import React from 'react';
import styles from './IconAvatar.module.scss';

interface Props {
  icon: string;
  status: 'waiting' | 'playing';
}

const IconAvatar = ({ icon, status }: Props) => (
  <div
    className={`${styles['icon-avatar']} ${styles[`icon-avatar--${status}`]}`}
  >
    <img src={icon} alt="icon-avatar" width="24" height="24" />
  </div>
);

export default React.memo(IconAvatar);
