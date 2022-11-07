import { Sequelize } from 'sequelize-typescript';
import {
  dbHost, dbName, dbPassword, dbPort, dbUser,
} from './config';
import User from './db/models/UserModel';

export const sequelize = new Sequelize({
  dialect: 'postgres',
  models: [User],
  host: dbHost,
  port: dbPort,
  database: dbName,
  username: dbUser,
  password: dbPassword,
  dialectOptions: {
    ssl: dbHost !== '127.0.0.1' && {
      require: true,
      rejectUnauthorized: false,
    },
  },
});
