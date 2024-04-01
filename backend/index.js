import express from 'express';
import 'dotenv/config';
import router from './router.js';
import sequelize from './db/index.js';
import cors from 'cors';

const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);

async function startApp() {
  try {
    await sequelize.authenticate();
    await sequelize.sync();
    app.listen(process.env.PORT, () => console.log('SERVER STARTED ON PORT ' + process.env.PORT));
  } catch (e) {
    console.log(e);
  }
}

export default startApp;
