import { v4 as uuid } from 'uuid';
import { IMatrix, ISquare } from '../redux/types/IMatrix';
import ShipsEnum from '../enums/ShipsEnum';

interface ICharacter {
  id: string;
  character: string;
}

export const GenerateLetter = (size: number) => {
  const row: ICharacter[] = [];
  const alpha = Array.from(Array(26)).map((_, i) => i + 65);
  const alphabet = alpha.map((x) => String.fromCharCode(x));

  for (let i = 0; i < size; i += 1) {
    const id = uuid();
    row.push({ id, character: alphabet[i] });
  }
  return row;
};

interface INumber {
  id: string;
  number: number;
}

export const GenerateNumber = (size: number) => {
  const row: INumber[] = [];

  for (let i = 0; i < size; i += 1) {
    const id = uuid();
    row.push({ id, number: i + 1 });
  }
  return row;
};

export const GenerateMatrix = (size: number) => {
  const matrix: IMatrix = {
    id: uuid(),
    rows: [],
    cruiserNumber: 0,
    destroyerNumber: 0,
    submarineNumber: 0,
    battleshipNumber: 0,
    carrierNumber: 0,
    shipsPositions: [],
  };

  for (let i = 0; i < size; i += 1) {
    const row = [];
    for (let j = 0; j < size; j += 1) {
      row.push({
        id: uuid(),
        isEmpty: true,
        isHitted: false,
        position: { x: i, y: j },
        shipType: undefined,
        shipPart: undefined,
        shipRotation: undefined,
      });
    }
    matrix.rows.push({ id: uuid(), squares: row });
  }
  return matrix;
};

export const CloneMatrix = (matrix: IMatrix) => {
  const clone: IMatrix = {
    ...matrix,
    rows: [],
  };

  matrix.rows.forEach((row) => {
    const newRow: ISquare[] = [];
    row.squares.forEach((square) => {
      newRow.push({
        id: uuid(),
        isEmpty: square.isEmpty,
        isHitted: square.isHitted,
        position: { x: square.position.x, y: square.position.y },
        shipType: square.shipType,
        shipPart: square.shipPart,
        shipRotation: square.shipRotation,
      });
    });
    clone.rows.push({ id: uuid(), squares: newRow });
  });
  return clone;
};

export const CloneMatrixWithoutShip = (
  matrix: IMatrix,
  shipType: ShipsEnum,
) => {
  const clone: IMatrix = {
    ...matrix,
    rows: [],
  };

  matrix.rows.forEach((row) => {
    const newRow: ISquare[] = [];
    row.squares.forEach((square) => {
      newRow.push({
        id: uuid(),
        isEmpty: square.shipType === shipType ? true : square.isEmpty,
        isHitted: square.shipType === shipType ? false : square.isHitted,
        position: { x: square.position.x, y: square.position.y },
        shipType: square.shipType === shipType ? undefined : square.shipType,
        shipPart: square.shipType === shipType ? undefined : square.shipPart,
        shipRotation:
          square.shipType === shipType ? undefined : square.shipRotation,
      });
    });
    clone.rows.push({ id: uuid(), squares: newRow });
  });
  return clone;
};
