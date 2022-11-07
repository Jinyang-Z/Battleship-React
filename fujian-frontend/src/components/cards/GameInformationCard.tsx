import React from 'react';
import { useAppSelector } from '../../hooks/Hooks';
import PlayerEnum from '../../enums/PlayerEnum';
import styles from './GameInformationCard.module.scss';

enum GameStatusEnum {
  WAITING_FOR_PLAYERS = 'Waiting for another player',
  WAITING_FOR_GAME_START = 'Place your ships',
  WAITING_YOU_PLACE_SHIP = 'Waiting you placing ship',
  WAITING_OPPONENT_PLACE_SHIP = 'Waiting opponent placing ship',
  WAITING_FOR_YOU = 'You turn',
  WAITING_FOR_OPPONENT = 'Opponent turn',
  YOU_WIN = 'You are the winner',
  YOU_LOSE = 'You are the loser',
}

const GameInformationCard = () => {
  const room = useAppSelector((state) => state.room);
  const game = useAppSelector((state) => state.game);

  const renderRoomStatusMessage = (): string => {
    if (game.winner !== null) {
      if (game.winner === PlayerEnum.ME) {
        return GameStatusEnum.YOU_WIN;
      }
      return GameStatusEnum.YOU_LOSE;
    }
    if (!game.playerIsReady && !game.opponentIsReady) {
      if (!room.isWaitingGameStart && !room.isWaitingForOtherPlayer) {
        return GameStatusEnum.WAITING_FOR_GAME_START;
      }
    }
    if (!room.isWaitingGameStart && !room.isWaitingForOtherPlayer) {
      if (game.playerIsReady && !game.opponentIsReady) {
        return GameStatusEnum.WAITING_OPPONENT_PLACE_SHIP;
      }
      if (!game.playerIsReady && game.opponentIsReady) {
        return GameStatusEnum.WAITING_YOU_PLACE_SHIP;
      }
    }
    if (!room.isWaitingGameStart && !room.isWaitingForOtherPlayer) {
      if (game.playerIsReady && game.opponentIsReady) {
        if (game.turn === PlayerEnum.ME) {
          return GameStatusEnum.WAITING_FOR_YOU;
        }
        if (game.turn === PlayerEnum.OPPONENT) {
          return GameStatusEnum.WAITING_FOR_OPPONENT;
        }
      }
    }
    return GameStatusEnum.WAITING_FOR_PLAYERS;
  };

  return (
    <div className={styles['game-information-card']}>
      <p className={styles['game-information-card__label']}>
        {renderRoomStatusMessage()}
      </p>
    </div>
  );
};

export default React.memo(GameInformationCard);
