import { QuestionModel, OptionModel } from "./db/models.js";

class QuestionsService {
  async getAll() {
    try {
      const dbQuestions = await QuestionModel.findAll();
      return dbQuestions.map(async (question) => {
        if (question.type === "input") return question;

        const dpOptions = await OptionModel.findAll({
          where: {
            questionId: question.id,
          },
        });

        return { ...question.dataValues, options: dpOptions };
      });
    } catch (e) {
      throw e;
    }
  }

  async create(question) {
    try {
      const dbQuestion = await QuestionModel.create(question);

      if (question.type === "input") {
        return [dbQuestion];
      }

      const dbOptions = await Promise.all(
        question.options.map((option) =>
          OptionModel.create({ title: option, questionId: dbQuestion.id })
        )
      );

      return [dbQuestion, dbOptions];
    } catch (e) {
      throw e;
    }
  }

  async delete(id) {
    try {
      const optionsDeleted = await OptionModel.destroy({
        where: {
          questionId: id,
        },
      });
      const questionDelted = await QuestionModel.destroy({
        where: {
          id,
        },
      });
      return {
        optionsDeleted,
        questionDelted,
      };
    } catch (e) {
      throw e;
    }
  }
}

export default new QuestionsService();
