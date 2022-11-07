import React, { useEffect, useCallback } from 'react';
import { useNavigate } from 'react-router-dom';

import Button from 'react-bootstrap/esm/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import { startConnecting, leaveRoom } from '../../redux/slices/RoomSlice';

import UserNavbar from '../../components/navbars/UserNavbar';
import Board from '../../components/boards/Board';
import Shipyard from '../../components/ships/Shipyard';
import ShipAction from '../../components/boards/ShipAction';
import toastify from '../../components/toastify/Toastify';
import GameInformationCard from '../../components/cards/GameInformationCard';

import { upperCaseFirstLetter } from '../../utils/StringFormatter';
import PlayerEnum from '../../enums/PlayerEnum';
import styles from './Room.module.scss';
import LeaveLogo from '../../assets/icons/leave_room.svg';

const Room = () => {
  const dispatch = useAppDispatch();

  const navigate = useNavigate();
  // const { roomId } = useParams();
  const { user } = useAppSelector((state) => state.auth);
  const { room } = useAppSelector((state) => state.room);

  const game = useAppSelector((state) => state.game);
  const playerBoard = useAppSelector(
    (state) => state.board.matrix[PlayerEnum.ME],
  );
  const opponentBoard = useAppSelector(
    (state) => state.board.matrix[PlayerEnum.OPPONENT],
  );
  const board = useAppSelector((state) => state.board);

  const handleLeaveRoom = useCallback(() => {
    if (room && user) {
      dispatch(leaveRoom({ roomId: room.id, playerId: user.id }));
      navigate('/rooms');
      toastify({
        type: 'success',
        message: `${upperCaseFirstLetter(
          user.pseudo,
        )} has left room ${upperCaseFirstLetter(room.name)} successfully`,
      });
    }
  }, [dispatch, navigate, room, user]);

  useEffect(() => {
    const handleReaload = () => {
      handleLeaveRoom();
      return '';
    };
    window.onbeforeunload = handleReaload;
    return () => {
      window.removeEventListener('beforeunload', handleReaload);
    };
  }, [handleLeaveRoom]);

  useEffect(() => {
    if (room === undefined) {
      navigate('/rooms');
    }
  }, [room, navigate]);

  useEffect(() => {
    const nbPlayers = room?.players.length;
    if (room && nbPlayers && nbPlayers > 0) {
      const player = room?.players[nbPlayers - 1];
      if (player.hasJoined) {
        toastify({
          type: 'success',
          message: `${upperCaseFirstLetter(
            player.pseudo,
          )} has joined room ${upperCaseFirstLetter(room.name)} successfully`,
        });
      }
    }
  }, [room]);

  useEffect(() => {
    dispatch(startConnecting());
  }, [dispatch]);

  return (
    <div className={styles.room}>
      <UserNavbar />
      <Button
        className={styles['styles.room__main__leave-button']}
        variant="danger"
        type="button"
        onClick={handleLeaveRoom}
      >
        <img src={LeaveLogo} alt="power-logo" />
      </Button>
      <div className={styles.room__main}>
        <div className={styles.room__main__action}>
          <div className={styles.room__main__board}>
            <div
              className={`${styles.room__main__board__header} ${
                styles[`room__main__board__header--${PlayerEnum.ME}`]
              }`}
            >
              <p className={styles.room__main__board__header__label}>
                YOUR FLEET
              </p>
            </div>
            <Board game={game} matrix={playerBoard} player={PlayerEnum.ME} />
            <Shipyard rotation="90" />
          </div>
          {!game.isPlaying && (
            <div className={styles.room__main__action__bar}>
              <ShipAction board={board} />
            </div>
          )}
        </div>
        <div className={styles.room__main__divider}>
          <GameInformationCard />
        </div>
        <div className={styles.room__main__board}>
          <div
            className={`${styles.room__main__board__header} ${
              styles[`room__main__board__header--${PlayerEnum.OPPONENT}`]
            }`}
          >
            <p className={styles.room__main__board__header__label}>
              OPPONENT FLEET
            </p>
          </div>
          <Board
            game={game}
            matrix={opponentBoard}
            player={PlayerEnum.OPPONENT}
          />
          <Shipyard rotation="90" />
        </div>
      </div>
    </div>
  );
};

export default Room;
