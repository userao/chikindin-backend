import { Router } from "express";
import PollsController from "./PollsController.js";

const router = new Router();

router.get('/polls', PollsController.getAll);
router.post('/polls', PollsController.create);

export default router;
