import React from 'react';
import { useDrop } from 'react-dnd';
import Ship from './Ship';
import ShipsEnum from '../../enums/ShipsEnum';
import { useAppDispatch, useAppSelector } from '../../hooks/Hooks';
import IGame from '../../redux/types/IGame';
import { ISquare } from '../../redux/types/IMatrix';
import {
  setSquareHitted,
  setShipPosition,
  setLastSelectedShip,
  playTurn,
} from '../../redux/slices/BoardSlice';
import HitIcon from '../../assets/game/hit.svg';
import PlayerMissIcon from '../../assets/game/player-miss.svg';
import OpponentMissIcon from '../../assets/game/opponent-miss.svg';
import PlayerEnum from '../../enums/PlayerEnum';
import styles from './Square.module.scss';

interface Props {
  game: IGame;
  square: ISquare;
  player: PlayerEnum;
}

const Square = ({ game, square, player }: Props) => {
  const dispatch = useAppDispatch();

  const { user } = useAppSelector((state) => state.auth);
  const { room } = useAppSelector((state) => state.room);
  const board = useAppSelector((state) => state.board);

  const [{ isOver }, drop] = useDrop(
    {
      accept: [
        ShipsEnum.CRUISER,
        ShipsEnum.DESTROYER,
        ShipsEnum.SUBMARINE,
        ShipsEnum.BATTLESHIP,
        ShipsEnum.CARRIER,
      ],
      drop: (_, monitor) => {
        dispatch(
          setShipPosition({
            player,
            shipType: monitor.getItemType() as ShipsEnum,
            position: square.position,
            rotation: 90,
          }),
        );
      },
      collect: (monitor) => ({
        isOver: monitor.isOver(),
      }),
    },
    [square.position.x, square.position.y],
  );

  const handleSquareClick = () => {
    if (
      board.response && room && player === PlayerEnum.OPPONENT
      && board.response.playerIdToPlay === user?.id && !square.isHitted && game.winner === null
    ) {
      dispatch(
        setSquareHitted({ player, position: square.position, status: true }),
      );
      dispatch(
        playTurn({
          playerId: user.id,
          roomId: room.id,
          x: square.position.x,
          y: square.position.y,
        }),
      );
    } else if (!game.isPlaying && square.shipType !== undefined) {
      dispatch(setLastSelectedShip(square.shipType));
    }
  };

  return (
    <button
      type="button"
      aria-label="updateSquare"
      onClick={() => {
        handleSquareClick();
      }}
      className={`${styles.square} ${styles[`square--${player}`]}`}
      ref={drop}
    >
      {square.isHitted && square.isEmpty && player === PlayerEnum.ME && (
        <img
          className={styles.square__icon}
          src={PlayerMissIcon}
          alt="player-miss"
        />
      )}
      {square.isHitted && square.isEmpty && player === PlayerEnum.OPPONENT && (
        <img
          className={styles.square__icon}
          src={OpponentMissIcon}
          alt="oppenent-miss"
        />
      )}
      {square.isHitted && !square.isEmpty && (
        <img
          className={styles['square__hitted-not-empty']}
          src={HitIcon}
          alt="hit"
        />
      )}
      <Ship square={square} />
      {isOver && <div className={styles.square__overlay} />}
    </button>
  );
};

export default React.memo(Square);
