import ProjectsService from "./ProjectsService.js";

class ProjectsController {
  async getAll(req, res) {
    try {
      const projects = await ProjectsService.getAll();
      res.status(200).json(await Promise.all(projects))
    } catch(e) {
      res.status(500).json(e.message)
    }

  }

  async create(req, res) {
    try {
      const projects = await ProjectsService.create(req.body, req.files);
      res.status(200).json(projects);
    } catch(e) {
      res.status(500).json(e.message)
    }
  }
}

export default new ProjectsController;
