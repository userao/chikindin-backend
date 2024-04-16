import { Router } from "express";
import PollsController from "./PollsController.js";
import QuestionsController from "./QuestionsController.js";
import ProjectsController from "./ProjectsController.js";

const router = new Router();

router.get('/polls', PollsController.getAll);
router.post('/polls', PollsController.create);
router.get('/questions', QuestionsController.getAll);
router.post('/questions', QuestionsController.create);
router.get('/projects', ProjectsController.getAll);
router.post('/projects', ProjectsController.create);

export default router;
