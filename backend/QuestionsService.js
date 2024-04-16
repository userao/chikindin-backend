import { QuestionModel, OptionModel } from './db/models.js';

class QuestionsService {
  async getAll() {
    const questions = await QuestionModel.findAll();
    const allOptions = await OptionModel.findAll();

    return questions.map((q) => {
      if (q.type === 'input') return q;

      const questionOptions = allOptions.filter((op) => op.questionId === q.id);
      return { ...q.dataValues, options: questionOptions }
    })
  }

  async create(questions) {
    try {
      questions.forEach(async (q) => {
        const dbQuestion = await QuestionModel.create(q);

        if (q.type !== 'input') {
          q.options.forEach((op) => OptionModel.create({ title: op, questionId: dbQuestion.id }));
        }
      })

      return questions;
    } catch (e) {
      throw new Error(e);
    }

  }
}

export default new QuestionsService;
