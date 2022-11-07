import { IBoat, IGameMap, MapCell, IPlayTurnInput, IGameResponse, IGameBoat } from '../types/IGame';
import { WSRoom } from './WSRoom';

export class WSGame {
  roomInformation: WSRoom;

  gameMap: IGameMap[] = [];

  boats: IGameBoat[] = [];

  constructor(room: WSRoom, playerId: string, boats: IBoat[]) {
    this.roomInformation = room;
    this.addPlayer(playerId, boats);
  }

  addPlayer(playerId: string, boats: IBoat[]) {
    boats.forEach((b) => {
      b.isDestroyed = false;
      b.coordinates.forEach((c) => {
        c.isTouched = false;
      });
    });
    this.boats.push({ data: boats, playerId });
    this.gameMap.push({
      map: this.initMap(boats),
      playerId,
    });
  }

  initMap(boats: IBoat[]) {
    const map: MapCell[][] = [];
    for (let i = 0; i < this.roomInformation.mapSize; i++) {
      map[i] = [];
      for (let j = 0; j < this.roomInformation.mapSize; j++) {
        map[i][j] = boats.find((b) => b.coordinates.find((c) => c.x === i && c.y === j)) ? MapCell.boat : MapCell.void;
      }
    }
    console.log(map);
    return map;
  }

  checkWin(playerId: string, x: number, y: number) {
    const boats = this.boats.find((b) => b.playerId === playerId).data;
    const boat = boats.find((b) => b.coordinates.find((c) => c.x === x && c.y === y));
    boat.coordinates.find((c) => c.x === x && c.y === y).isTouched = true;
    if (!boat.coordinates.filter((c) => !c.isTouched).length) {
      boat.isDestroyed = true;
    }
    return boats.filter((b) => !b.isDestroyed).length === 0;
  }

  playTurn(payload: IPlayTurnInput): IGameResponse {
    const enemy = this.roomInformation.players.filter((p) => p.id !== payload.playerId)[0].id;
    const newMapCell: MapCell = this.gameMap.find((gm) => gm.playerId === enemy)
      .map[payload.x][payload.y] === MapCell.boat ? MapCell.boatTouched : MapCell.voidTouched;
    let playerWin = false;
    if (newMapCell === MapCell.boatTouched) {
      playerWin = this.checkWin(enemy, payload.x, payload.y);
    }
    this.gameMap.find((gm) => gm.playerId === enemy).map[payload.x][payload.y] = newMapCell;
    return {
      playerIdToPlay: newMapCell === MapCell.boatTouched ? payload.playerId : enemy,
      playerIdPlayed: payload.playerId,
      x: payload.x,
      y: payload.y,
      cellType: newMapCell,
      playerIdWin: playerWin ? payload.playerId : null,
    };
  }
}
