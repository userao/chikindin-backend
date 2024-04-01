import PollsService from "./PollsService.js";

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
      return res.status(200).json(poll);
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new PollsController;
