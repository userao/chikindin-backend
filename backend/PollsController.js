import PollsService from "./PollsService.js";
import { bot } from "../bot/index.js";
import { normalizePollForTG } from "./utils.js";
import { getSubscribers } from './db/utils.js';

class PollsController {
  async getAll(req, res) {
    try {
      const allPolls = await PollsService.getAll();
      return res.json(allPolls)
    } catch (e) {
      res.json(e.message);
    }
  }

  async create(req, res) {
    try {
      const poll = await PollsService.create(req.body);
      const dbSubscribers = await getSubscribers();
      dbSubscribers.forEach((sub) => {
        const { chatId } = sub.dataValues;
        bot.sendMessage(chatId, `Новая анкета:\n${normalizePollForTG(poll)}`);
      })
      return res.status(200).json(poll);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new PollsController;
