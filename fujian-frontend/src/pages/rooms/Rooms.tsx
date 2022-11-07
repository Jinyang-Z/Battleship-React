import React, { useState, useEffect } from 'react';
import Button from 'react-bootstrap/Button';
import { FormattedMessage } from 'react-intl';

import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import { startConnecting } from '../../redux/slices/RoomsSlice';

import UserNavbar from '../../components/navbars/UserNavbar';
import SearchInput from '../../components/inputs/SearchInput';
import Loading from '../../components/loading/Loading';
import CreateRoomModal from '../../components/modal/CreateRoomModal';
import RoomPreviewCard from '../../components/cards/RoomPreviewCard';
import toastify from '../../components/toastify/Toastify';

import styles from './Rooms.module.scss';

const Rooms = () => {
  const [show, setShow] = useState(false);
  const dispatch = useAppDispatch();

  const { rooms, isLoading, isError } = useAppSelector((state) => state.rooms);
  const { message } = useAppSelector((state) => state.message);

  useEffect(() => {
    if (!isLoading && isError) {
      toastify({ type: 'error', message });
    }
  }, [message, isLoading, isError]);

  useEffect(() => {
    dispatch(startConnecting());
  }, [dispatch]);

  return (
    <div className={styles.rooms}>
      <UserNavbar />
      <CreateRoomModal show={show} onHide={setShow} />
      <div className={styles.rooms__main}>
        <div className={styles.rooms__main__header}>
          <p className={styles.rooms__main__header__title}>
            <FormattedMessage id="list-of-rooms" />
          </p>
          <Button
            variant="success"
            onClick={() => {
              setShow(true);
            }}
          >
            <FormattedMessage id="create-new-game" />
          </Button>
        </div>
        <div>
          <SearchInput />
        </div>
        <div className={styles.rooms__main__body}>
          {isLoading ? (
            <Loading label="Loading rooms..." />
          ) : (
            <div className={styles.rooms__main__body__rooms}>
              {rooms.rooms.map((room) => (
                <div key={room.id}>
                  <RoomPreviewCard
                    id={room.id}
                    label={room.name}
                    numberOfPlayer={room.players.length}
                    capacity={room.capacity}
                    status={room.players.length === 2 ? 'playing' : 'waiting'}
                    hasPassword={!!room.password}
                  />
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Rooms;
