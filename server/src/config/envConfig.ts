import dotenv from "dotenv";

dotenv.config();

export const config = {
  app: {
    port: process.env.PORT ? Number(process.env.PORT) : 5000,
    env: process.env.NODE_ENV || "development",
  },
  database: {
    uri: process.env.DB_URI || "mongodb://localhost:27017/dev_database",
    mongodKey: process.env.MONGOD_SESSION_PRIVATE_KEY as string,
  },
  jwt: {
    accessTokenSecret:
      process.env.JWT_ACCESS_TOKEN_SECRET || "defaultAccessTokenSecret",
    refreshTokenSecret:
      process.env.JWT_REFRESH_TOKEN_SECRET || "defaultRefreshTokenSecret",
    accessTokenExpire: process.env.JWT_ACCESS_TOKEN_EXPIRE || "3d",
    refreshTokenExpire: process.env.JWT_REFRESH_TOKEN_EXPIRE || "30d",
  },
};
