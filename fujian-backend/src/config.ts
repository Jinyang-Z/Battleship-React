console.log('Ouais: ', process.env.DB_HOST);

export const dbHost = String(process.env.DB_HOST);
export const dbPort = Number(process.env.DB_PORT);
export const dbName = String(process.env.DB_NAME);
export const dbUser = String(process.env.DB_USER);
export const dbPassword = String(process.env.DB_PASSWORD);
export const frontAdress = String(process.env.NODE_ENV === 'production'
  ? process.env.FRONT_ADDRESS_PRODUCTION
  : process.env.FRONT_ADDRESS_DEV);
export const jwtPrivateKey = String(process.env.PRIVATE_KEY);
