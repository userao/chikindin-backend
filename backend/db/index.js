import { Sequelize } from 'sequelize';

const host = process.env.NODE_ENV === 'development' ? process.env.HOST_DEV : process.env.HOST_PROD;
export default new Sequelize(
  process.env.BASE_NAME,
  process.env.SQL_USER,
  process.env.SQL_PASSWORD,
  {
    host,
    port: '5432',
    dialect: 'postgres',
  }
)