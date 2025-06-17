import { config } from "dotenv";

config();

export const env = {
  PORT: process.env.PORT || 5000,
  NODE_ENV: process.env.NODE_ENV || "development",
  FIREBASE_APIKEY: process.env.FIREBASE_APIKEY || "",
  FIREBASE_AUTHDOMAIN: process.env.FIREBASE_AUTHDOMAIN || "",
  FIREBASE_PROJECTID: process.env.FIREBASE_PROJECTID || "",
  FIREBASE_STORAGEBUCKET: process.env.FIREBASE_STORAGEBUCKET || "",
  FIREBASE_MESSAGINGSENDERID: process.env.FIREBASE_MESSAGINGSENDERID || "",
  FIREBASE_APPID: process.env.FIREBASE_APPID || "",
  FIREBASE_MEASUREMENTID: process.env.FIREBASE_MEASUREMENTID || "",
  ADMIN_CLIENTEMAIL: process.env.ADMIN_CLIENTEMAIL || "",
  ADMIN_PRIVATEKEY: process.env.ADMIN_PRIVATEKEY || "",
  DB_HOST: process.env.DB_HOST || "localhost",
  DB_USER: process.env.DB_USER || "root",
  DB_PASSWORD: process.env.DB_PASSWORD || "",
  DB_NAME: process.env.DB_NAME || "wefoundit",
  DB_PORT: process.env.DB_PORT ? parseInt(process.env.DB_PORT, 10) : 3306,
  JWT_SECRET: process.env.JWT_SECRET || "defaultsecret",
  JWT_EXPIRATION: process.env.JWT_EXPIRATION || "1h",
  CORS_ORIGIN: process.env.CORS_ORIGIN || "http://localhost:3000",
  LOG_LEVEL: process.env.LOG_LEVEL || "info",
};
