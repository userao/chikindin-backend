import { Sequelize } from 'sequelize';

export default new Sequelize(
  'chikindin-design',
  'postgres',
  '111',
  {
    host: 'localhost',
    port: '5432',
    dialect: 'postgres',
  }
)