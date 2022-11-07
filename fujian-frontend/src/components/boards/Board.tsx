import React from 'react';
import Square from './Square';
import { GenerateLetter, GenerateNumber } from '../../utils/Generator';

import IGame from '../../redux/types/IGame';
import { IMatrix } from '../../redux/types/IMatrix';
import PlayerEnum from '../../enums/PlayerEnum';
import styles from './Board.module.scss';

interface Props {
  game: IGame
  matrix: IMatrix;
  player: PlayerEnum;
}

const Board = ({ game, matrix, player }: Props) => {
  const letterArray = GenerateLetter(game.size);
  const numberArray = GenerateNumber(game.size);

  return (
    <div className={styles.board}>
      <div className={styles.board__header}>
        {letterArray.map(({ id, character }) => (
          <div key={id} className={styles.board__header__box}>
            <p className={styles.board__header__box__character}>{character}</p>
          </div>
        ))}
      </div>
      <div className={styles.board__body}>
        <div className={styles.board__body__header}>
          {numberArray.map(({ id, number }) => (
            <div key={id} className={styles.board__body__header__box}>
              <p className={styles.board__body__header__box__character}>
                {number}
              </p>
            </div>
          ))}
        </div>
        <div className={styles.board__body__board}>
          {matrix.rows.map((row) => (
            <div
              id={row.id}
              key={row.id}
              className={styles.board__body__board__row}
            >
              {row.squares.map((square) => (
                <div
                  id={`${square.position.x}-${square.position.y}`}
                  key={square.id}
                  className={styles.board__body__board__row__square}
                >
                  <Square game={game} square={square} player={player} />
                </div>
              ))}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default React.memo(Board);
