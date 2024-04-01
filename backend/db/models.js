import sequelize from './index.js';
import { DataTypes } from 'sequelize';

const PollModel = sequelize.define('poll', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING },
  author: { type: DataTypes.STRING },
  phone: { type: DataTypes.STRING },
  email: { type: DataTypes.STRING },
  address: { type: DataTypes.STRING },
  area: { type: DataTypes.STRING },
  style: { type: DataTypes.STRING },
  familyMembers: { type: DataTypes.STRING },
  pets: { type: DataTypes.STRING },
  petsDetails: { type: DataTypes.STRING },
  tenantsDetails: { type: DataTypes.STRING },
  zones: { type: DataTypes.STRING },
  bedroomsNumber: { type: DataTypes.STRING },
  toiletsNumber: { type: DataTypes.STRING },
  wardrobesNumber: { type: DataTypes.STRING },
  balconiesNumber: { type: DataTypes.STRING },
  purpose: { type: DataTypes.STRING },
  capacity: { type: DataTypes.STRING },
  haveBrandbook: { type: DataTypes.STRING },
  palette: { type: DataTypes.STRING },
  appliances: { type: DataTypes.STRING },
  realisationTime: { type: DataTypes.STRING },
});

export { PollModel };