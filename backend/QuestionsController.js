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

  async getOne(req, res) {
    try {
      const question = await QuestionsService.getOne(req.params.id);
      res.status(200).json(question);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }

  async create(req, res) {
    QuestionsService.create(req.body)
      .then((question) => res.status(200).json(question))
      .catch((e) => res.status(500).json(e.message));
  }

  async delete(req, res) {
    try {
      const deleted = await QuestionsService.delete(req.params.id);
      res.status(200).json(deleted);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new QuestionsController();
