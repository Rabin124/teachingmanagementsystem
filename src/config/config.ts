import {config} from 'dotenv';

config();

export const envConfig = {
  portNumber : process.env.PORT,
  databaseName : process.env.DATABASE_NAME,
  databaseUser : process.env.DATABASE_USER,
  databasePassword : process.env.DATABASE_PASSWORD,
  databaseHost : process.env.DATABASE_HOST,
  databasePort : process.env.DATABASE_PORT,
  
}