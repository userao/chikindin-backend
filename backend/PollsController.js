import PollsService from "./PollsService.js";
import { bot } from "../bot/index.js";

class PollsController {
  async getAll(req, res) {
    try {
      const allPolls = await PollsService.getAll();
      return res.json(allPolls)
    } catch(e) {
      res.json(e.message);
    }
  }

  async create(req, res) {
    try {
      const poll = await PollsService.create(req.body);
      // тут отправляем сообщение в тг. Ответы для отправки берем из req.body
      bot.sendMessage(496511827, JSON.stringify(req.body));
      return res.status(200).json(poll);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new PollsController;
