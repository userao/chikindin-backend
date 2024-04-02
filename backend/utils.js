function normalizePollForTG(dbPoll) {
  const dbPollValues = dbPoll.dataValues;
  const tgPoll = {};

  for (const tgFieldName in fieldsMapping) {
    const dbFieldName = fieldsMapping[tgFieldName];
    const pollAnswer = dbPollValues[dbFieldName];
    if (pollAnswer) {
      tgPoll[tgFieldName] = pollAnswer;
    }
  }

  return JSON.stringify(tgPoll, null, 2).replace(/([{}"]+)|,$/gm, '');
}

function normalizePollForDB(formPoll) {
  const dbPoll = Object.entries(formPoll).reduce((acc, [question, value]) => {
    const dbFieldName = fieldsMapping[question];
    let stringValue = value;
    if (Array.isArray(value)) {
      stringValue = value.join(', ');
    }
    return { ...acc, [dbFieldName]: stringValue };
  }, {})
  return dbPoll;
}

var fieldsMapping = {
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

export { normalizePollForTG, normalizePollForDB };