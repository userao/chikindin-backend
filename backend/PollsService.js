import { PollModel } from './db/models.js';

// здесь отправляем сообщение в телегу всем кто подписался в функции create()

class PollsService {
  async getAll() {
    return await PollModel.findAll();
  }

  async create(formPoll) {
    const dbFieldsMapping = {
      'Тип интерьера': 'type',
      'Ваше имя': 'author',
      'Ваш телефон': 'phone',
      'Ваш e-mail': 'email',
      'Адрес объекта': 'address',
      'Площадь (м2)': 'area',
      'Стилистика': 'style',
      'Сколько членов семьи?': 'familyMembers',
      'Домашние животные': 'pets',
      'Подробности о ваших домашних животных (порода, необходимое оборудование и т.п.)': 'petsDetails',
      'Особенности жильцов': 'tenantsDetails',
      'Необходимые зоны': 'zones',
      'Количество спален': 'bedroomsNumber',
      'Количество санузлов': 'toiletsNumber',
      'Количество гардеробных': 'wardrobesNumber',
      'Количество балконов': 'balconiesNumber',
      'Назначение (например, кафе, спа, отель и т.д.)': 'purpose',
      'Вместимость': 'capacity',
      'Есть ли брендбук?': 'haveBrandbook',
      'Цветовая палитра': 'palette',
      'Необходимая техника': 'appliances',
      'Желаемые сроки реализации проекта': 'realisationTime',
    }
    const dbPoll = Object.entries(formPoll).reduce((acc, [question, value]) => {
      const dbFieldName = dbFieldsMapping[question];
      let stringValue = value;
      if (Array.isArray(value)) {
        stringValue = value.join(', ');
      }
      return { ...acc, [dbFieldName]: stringValue };
    }, {})
    return await PollModel.create(dbPoll);
  }
}

export default new PollsService;
