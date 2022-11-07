import React from 'react';
import Button from 'react-bootstrap/Button';
import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import { RandomPosition, RandomRotation } from '../../utils/Random';
import {
  setShipEmpty,
  setShipEmptyUnique,
  setShipPosition,
  startPlayer,
} from '../../redux/slices/BoardSlice';
import ShuffleIcon from '../../assets/icons/shuffle.svg';
import RotateIcon from '../../assets/icons/rotate.svg';
import TrashIcon from '../../assets/icons/trash.svg';
import PlayIcon from '../../assets/icons/play.svg';
import IBoard from '../../redux/types/IBoard';
import PlayerEnum from '../../enums/PlayerEnum';
import ShipsEnum from '../../enums/ShipsEnum';
import styles from './ShipAction.module.scss';
import toastify from '../toastify/Toastify';

interface Props {
  board: IBoard;
}

const ShipAction = ({ board }: Props) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { room } = useAppSelector((state) => state.room);

  const shuffleCruiserPosition = () => {
    const rotation = RandomRotation();
    const x = RandomPosition(0, rotation === 90 ? 9 : 8);
    const y = RandomPosition(0, rotation === 90 ? 8 : 9);
    dispatch(
      setShipPosition({
        player: PlayerEnum.ME,
        shipType: ShipsEnum.CRUISER,
        position: { x, y },
        rotation,
      }),
    );
  };

  const shuffleDestroyerPosition = () => {
    const rotation = RandomRotation();
    const x = RandomPosition(0, rotation === 90 ? 9 : 7);
    const y = RandomPosition(0, rotation === 90 ? 7 : 9);
    dispatch(
      setShipPosition({
        player: PlayerEnum.ME,
        shipType: ShipsEnum.DESTROYER,
        position: { x, y },
        rotation,
      }),
    );
  };

  const shuffleSubmarinePosition = () => {
    const rotation = RandomRotation();
    const x = RandomPosition(0, rotation === 90 ? 9 : 7);
    const y = RandomPosition(0, rotation === 90 ? 7 : 9);
    dispatch(
      setShipPosition({
        player: PlayerEnum.ME,
        shipType: ShipsEnum.SUBMARINE,
        position: { x, y },
        rotation,
      }),
    );
  };

  const shuffleBattleshipPosition = () => {
    const rotation = RandomRotation();
    const x = RandomPosition(0, rotation === 90 ? 9 : 6);
    const y = RandomPosition(0, rotation === 90 ? 6 : 9);
    dispatch(
      setShipPosition({
        player: PlayerEnum.ME,
        shipType: ShipsEnum.BATTLESHIP,
        position: { x, y },
        rotation,
      }),
    );
  };

  const shuffleCarrierPosition = () => {
    const rotation = RandomRotation();
    const x = RandomPosition(0, rotation === 90 ? 9 : 5);
    const y = RandomPosition(0, rotation === 90 ? 5 : 9);
    dispatch(
      setShipPosition({
        player: PlayerEnum.ME,
        shipType: ShipsEnum.CARRIER,
        position: { x, y },
        rotation,
      }),
    );
  };

  const shuffleShipPosition = () => {
    dispatch(setShipEmpty());
    shuffleCruiserPosition();
    shuffleDestroyerPosition();
    shuffleSubmarinePosition();
    shuffleBattleshipPosition();
    shuffleCarrierPosition();
  };
  const numberOfShip = 5;
  const handleStartPlayer = () => {
    if (room && user) {
      if (board.matrix.me.shipsPositions.length === numberOfShip) {
        dispatch(
          startPlayer({
            boats: board.matrix.me.shipsPositions,
            playerId: user.id,
            roomId: room.id,
          }),
        );
      } else {
        toastify({ type: 'error', message: 'You have to set 5 ships.' });
      }
    }
  };

  return (
    <div className={styles['ship-action']}>
      <Button
        variant="light"
        className={styles['ship-action__button']}
        onClick={() => shuffleShipPosition()}
      >
        <img
          src={ShuffleIcon}
          alt="rotate-icon"
          className={styles['ship-action__button__icon']}
        />
      </Button>
      <Button
        variant="light"
        className={styles['ship-action__button']}
        onClick={() => {
          dispatch(setShipEmpty());
        }}
      >
        <img
          src={TrashIcon}
          alt="rotate-icon"
          className={styles['ship-action__button__icon']}
        />
      </Button>
      <Button
        variant="light"
        className={styles['ship-action__button']}
        onClick={() => {
          if (
            board.lastSelectedShipType
            && board.lastSelectedShipPosition
            && board.lastSelectedShipRotation
          ) {
            dispatch(setShipEmptyUnique(board.lastSelectedShipType));
            dispatch(
              setShipPosition({
                player: PlayerEnum.ME,
                shipType: board.lastSelectedShipType,
                position: board.lastSelectedShipPosition,
                rotation: board.lastSelectedShipRotation === 90 ? 180 : 90,
              }),
            );
          }
        }}
      >
        <img
          src={RotateIcon}
          alt="rotate-icon"
          className={styles['ship-action__button__icon']}
        />
      </Button>
      <Button
        variant="light"
        className={styles['ship-action__button']}
        onClick={handleStartPlayer}
      >
        <img
          src={PlayIcon}
          alt="rotate-icon"
          className={styles['ship-action__button__icon']}
        />
      </Button>
    </div>
  );
};

export default React.memo(ShipAction);
