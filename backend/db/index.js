import { Sequelize } from 'sequelize';

export default new Sequelize(
  process.env.BASE_NAME,
  process.env.SQL_USER,
  process.env.SQL_PASSWORD,
  {
    host: "localhost",
    port: '5432',
    dialect: 'postgres',
  }
)