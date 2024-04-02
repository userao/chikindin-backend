import { PollModel } from './db/models.js';
import { normalizePollForDB } from './utils.js';

class PollsService {
  async getAll() {
    return await PollModel.findAll();
  }

  async create(formPoll) {
    const dbPoll = normalizePollForDB(formPoll);
    return await PollModel.create(dbPoll);
  }
}

export default new PollsService;
