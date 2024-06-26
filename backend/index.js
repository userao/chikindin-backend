import express from 'express';
import 'dotenv/config';
import router from './router.js';
import sequelize from './db/index.js';
import cors from 'cors';

const photosPath = process.env.NODE_ENV === 'production' ? process.env.PHOTOS_PATH_PROD : process.env.PHOTOS_PATH_DEV;
const app = express();
app.use(express.json());
app.use(cors());
app.use('/api', router);
app.use('/api/photos', express.static(photosPath));

async function startApp() {
  try {
    await sequelize.authenticate();
    await sequelize.sync({ alter: true });
    app.listen(process.env.PORT, () => console.log('SERVER STARTED ON PORT ' + process.env.PORT));
  } catch (e) {
    console.log(e);
  }
}

export default startApp;
