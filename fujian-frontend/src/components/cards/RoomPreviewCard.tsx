import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { FormattedMessage } from 'react-intl';
import Button from 'react-bootstrap/Button';
import Spinner from 'react-bootstrap/Spinner';

import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import { joinRoom } from '../../redux/slices/RoomSlice';
import toastify from '../toastify/Toastify';

import IconAvatar from '../avatars/IconAvatar';
import GameControllerIcon from '../../assets/icons/room-controller.svg';
import UserIcon from '../../assets/icons/user.svg';
import styles from './RoomPreviewCard.module.scss';

interface Props {
  id: string;
  label: string;
  numberOfPlayer: number;
  capacity: number;
  status: 'waiting' | 'playing';
  hasPassword: boolean;
}

const RoomPreviewCard = ({
  id,
  label,
  numberOfPlayer,
  capacity,
  status,
  hasPassword,
}: Props) => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { user } = useAppSelector((state) => state.auth);
  const { room, isLoading, isError } = useAppSelector((state) => state.room);
  const { message } = useAppSelector((state) => state.message);

  const handleJoinRoom = () => {
    if (user) {
      dispatch(
        joinRoom({ roomId: id, playerId: user.id, password: undefined }),
      );
    }
  };

  useEffect(() => {
    if (!isLoading && !isError && room) {
      navigate(`/room/${room.id}`);
    } else if (!isLoading && isError) {
      toastify({ type: 'error', message });
    }
  }, [navigate, message, isLoading, isError, room]);

  return (
    <div className={styles['room-preview-card']}>
      <div className={styles['room-preview-card__header']}>
        <IconAvatar icon={GameControllerIcon} status={status} />
        <div className={styles['room-preview-card__header__room-information']}>
          <p
            className={
              styles['room-preview-card__header__room-information__title']
            }
          >
            {label}
          </p>
          <p
            className={
              styles['room-preview-card__header__room-information__subtitle']
            }
          >
            {status}
          </p>
        </div>
        <div
          className={styles['room-preview-card__header__player-information']}
        >
          <img src={UserIcon} alt="user-avatar-icon" width="24" height="24" />
          <p
            className={
              styles['room-preview-card__header__player-information__label']
            }
          >
            {`${numberOfPlayer} of ${capacity}`}
          </p>
        </div>
      </div>
      <div className={styles['room-preview-card__body']}>
        <p className={styles['room-preview-card__body__title']}>Normal</p>
        <div className={styles['room-preview-card__body__content']}>
          <p className={styles['room-preview-card__body__content__text']}>
            10x10
          </p>
          <p className={styles['room-preview-card__body__content__text']}>
            1 Shoot per turn
          </p>
          <p className={styles['room-preview-card__body__content__text']}>
            5 ships
          </p>
          <p className={styles['room-preview-card__body__content__text']}>
            10 seconds per turn
          </p>
          <p className={styles['room-preview-card__body__content__text']}>
            {hasPassword ? 'Private' : 'Public'}
          </p>
          <p className={styles['room-preview-card__body__content__text']}>
            1 vs 1
          </p>
        </div>
      </div>
      <div className={styles['room-preview-card__footer']}>
        <Button
          variant="success"
          disabled={status && status === 'playing'}
          onClick={() => handleJoinRoom()}
        >
          {isLoading ? (
            <Spinner animation="border" role="status" size="sm" />
          ) : (
            <FormattedMessage id="join" />
          )}
        </Button>
      </div>
    </div>
  );
};

export default React.memo(RoomPreviewCard);
