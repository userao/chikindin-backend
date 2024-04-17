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

const SubscriberModel = sequelize.define('subscriber', {
  chatId: { type: DataTypes.INTEGER, primaryKey: true },
  first_name: { type: DataTypes.STRING },
  last_name: { type: DataTypes.STRING },
  username: { type: DataTypes.STRING },
});

const QuestionModel = sequelize.define('question', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  type: { type: DataTypes.STRING, allowNull: false },
  title: { type: DataTypes.STRING, allowNull: false },
  projectType: { type: DataTypes.STRING, allowNull: false },
  required: { type: DataTypes.BOOLEAN, allowNull: false },
});

const OptionModel = sequelize.define('option', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  questionId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: QuestionModel,
      key: 'id',
    },
  },
  title: { type: DataTypes.STRING, allowNull: false }
});

const ProjectModel = sequelize.define('project', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  name: { type: DataTypes.STRING, allowNull: false },
  year: { type: DataTypes.STRING, allowNull: false },
  location: { type: DataTypes.STRING, allowNull: false },
  description: { type: DataTypes.STRING, allowNull: false },
  use: { type: DataTypes.STRING, allowNull: false },
});

const ProjectPhotoModel = sequelize.define('project_photo', {
  id: { type: DataTypes.INTEGER, primaryKey: true, autoIncrement: true },
  projectId: {
    type: DataTypes.INTEGER,
    allowNull: false,
    references: {
      model: ProjectModel,
      key: 'id',
    },
  },
  src: { type: DataTypes.STRING, allowNull: false },
})

export { PollModel, SubscriberModel, OptionModel, QuestionModel, ProjectModel, ProjectPhotoModel };