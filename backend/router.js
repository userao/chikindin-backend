import { Router } from "express";
import multer from 'multer';
import path from "node:path";
import PollsController from "./PollsController.js";
import QuestionsController from "./QuestionsController.js";
import ProjectsController from "./ProjectsController.js";

const photosPath = process.env.NODE_ENV === 'production' ? process.env.PHOTOS_PATH_DEV : process.env.PHOTOS_PATH_PROD;
const storage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, photosPath)
  },
  filename: function (req, file, cb) {
    cb(null, Date.now() + path.extname(file.originalname))
  }
})
const upload = multer({ storage });

const router = new Router();

router.get('/polls', PollsController.getAll);
router.post('/polls', PollsController.create);

router.get('/questions', QuestionsController.getAll);
router.post('/questions', QuestionsController.create);

router.get('/projects', ProjectsController.getAll);
router.post('/projects', upload.array('photos', 30), ProjectsController.create);

export default router;
