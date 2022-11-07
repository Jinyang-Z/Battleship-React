import { join } from 'path';
// import the app
import { App } from 'koa-smart';
import {
  i18n,
  bodyParser,
  helmet,
  cors,
  handleError,
  logger,
  RateLimit,
} from 'koa-smart/dist/middlewares';
import { Server, Socket } from 'socket.io';
import { createServer } from 'http';
import dotenv from 'dotenv';
dotenv.config();

import responseTime from './middlewares/ResponseTime';
import { sequelize } from './database';
import Authentication from './middlewares/Authentication';
import { frontAdress } from './config';
import WSRoomController from './sockets/WSRoomController';
import { WSRoom } from './WSModels/WSRoom';
import { SequelizeTypescriptMigration } from 'sequelize-typescript-migration-lts';
import WSGameController from './sockets/WSGameController';
import { WSGame } from './WSModels/WSGame';
import { getDataTokenJwt } from './utils';
import User from './db/models/UserModel';
import { ExtendedError } from 'socket.io/dist/namespace';

const myApp = new App({
  port: 8000,
});

myApp.addMiddlewares([
  responseTime,
  cors({ credentials: true }),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  helmet(),
  bodyParser({ multipart: true }),
  // eslint-disable-next-line @typescript-eslint/no-unsafe-call
  i18n(myApp.koaApp, {
    directory: join(__dirname, 'locales'),
    locales: ['en-US', 'fr-FR', 'cn-CN'],
    modes: ['query', 'subdomain', 'cookie', 'header', 'tld'],
    extension: '.json',
  }),
  Authentication,
  handleError(),
  logger(),
  RateLimit.middleware({ interval: { min: 1 }, max: 100 }),
]);

sequelize.sync().then(() => {
  console.log('Sequelized synchronized.');
}).catch((error) => {
  console.log(`Error in sequelize: ${error as string}`);
});

SequelizeTypescriptMigration.makeMigration(sequelize, {
  outDir: join(__dirname, './db/migrations/'),
  migrationName: 'init',
}).then(() => {
  console.log('SequelizeTypescriptMigration synchronized.');
}).catch((error) => {
  console.log(`Error in SequelizeTypescriptMigration: ${error as string}`);
});

myApp.mountFolder(join(__dirname, 'routes'), '/');

const httpServer = createServer(myApp.koaApp.callback());

export const io = new Server(httpServer, {
  cors: {
    origin: frontAdress,
  },
});

const listRoom: WSRoom[] = [];
const listGame: WSGame[] = [];

const onConnection = (socket: Socket) => {
  WSRoomController(io, socket, listRoom);
  WSGameController(io, socket, listRoom, listGame);
};

io.use((socket, next) => {
  // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
  const token: string = socket.handshake.auth.token;

  if (!token) {
    const err: ExtendedError = new Error('Error in authentication middleware');
    err.data = { content: 'Token not found. Yoy must specify a token' };
    next(err);
  }
  try {
    const user = getDataTokenJwt<User>(token);
    socket.data = { user };
  } catch (error) {
    console.error(error);
    const err: ExtendedError = new Error('Error in authentication middleware');
    err.data = { content: 'Token invalid.' };
    next(err);
  }
  next();
}).on('connection', onConnection);

httpServer.listen(process.env.PORT || 8001);

myApp.start().then((server) => {
  console.log(`Server listening to port ${myApp.port}`);
  return server;
}).catch((error) => {
  console.error(`Error in App root: ${error as string}`);
});
