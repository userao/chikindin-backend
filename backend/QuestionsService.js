import { QuestionModel, OptionModel } from "./db/models.js";

class QuestionsService {
  async getAll() {
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
  }

  async getOne(questionId) {
    const dbQuestion = await QuestionModel.findOne({
      where: {
        id: questionId,
      },
    });

    if (!dbQuestion) throw new Error("question not found in database");
    if (dbQuestion.type === "input") return dbQuestion;

    const dbOptions = await OptionModel.findAll({
      where: {
        questionId,
      },
    });

    return { ...dbQuestion.dataValues, options: dbOptions };
  }

  async create(question) {
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
  }

  async delete(id) {
    const optionsDeleted = await OptionModel.destroy({
      where: {
        questionId: id,
      },
    });
    const questionDeleted = await QuestionModel.destroy({
      where: {
        id,
      },
    });
    return {
      optionsDeleted,
      questionDeleted,
    };
  }
}

export default new QuestionsService();
