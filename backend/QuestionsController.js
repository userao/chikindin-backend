import QuestionsService from "./QuestionsService.js";

class QuestionsController {
  async getAll(req, res) {
    try {
      const questions = await QuestionsService.getAll();
      res.status(200).json(await Promise.all(questions));
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async create(req, res) {
    try {
      QuestionsService.create(req.body)
        .then((questions) => res.status(200).json(questions));
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new QuestionsController;
