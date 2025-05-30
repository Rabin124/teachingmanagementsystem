import {Sequelize} from "sequelize"
import { envConfig } from "../config/config";

const sequelize = new Sequelize({
  database: envConfig.databaseName,
  username: envConfig.databaseUser,
  password: envConfig.databasePassword,
  host: envConfig.databaseHost,
  port: Number(envConfig.databasePort) ,
  dialect: "mysql"
});

sequelize.authenticate()
.then(()=>{
  console.log("Authenticated, connected")
})
.catch((error)=>{
  console.log(error)
})


export default sequelize;