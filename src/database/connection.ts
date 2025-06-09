import {Sequelize} from "sequelize-typescript"
import { envConfig } from "../config/config";

export const sequelize = new Sequelize({
  database: envConfig.databaseName,
  username: envConfig.databaseUser,
  password: envConfig.databasePassword,
  host: envConfig.databaseHost,
  port: Number(envConfig.databasePort) ,
  dialect: "mysql",
  models :[__dirname + "/models"]
});

sequelize.authenticate()
.then(()=>{
  console.log("Authenticated, connected")
})
.catch((error)=>{
  console.log(error)
})


sequelize.sync({alter: false})
.then(() => {
  console.log("migrated synchronized successfully.");
})

export default sequelize;