import app from './src/app';
import { envConfig } from './src/config/config';

function startServer(){
  const port = envConfig.portNumber
  app.listen(port, () => {
    console.log(`Server is running on http://localhost:${port}`);
  });
  app.get("/", (req, res)=>{
    res.json("Hello");
  });
}

startServer();