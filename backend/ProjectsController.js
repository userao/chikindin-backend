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

  async getOne(req, res) {
    try {
      const project = await ProjectsService.getOne(req.params.id);
      res.status(200).json(project);
    } catch(e) {
      res.status(500).json(e.message);
    }
  }

  async create(req, res) {
    try {
      const projects = await ProjectsService.create(req.body, req.files);
      res.status(201).json(projects);
    } catch(e) {
      res.status(500).json(e.message)
    }
  }

  async delete(req, res) {
    try {
      const deleted = await ProjectsService.delete(req.params.id);
      res.status(200).json(deleted); 
    } catch (e) {
      res.status(500).json(e.message);
    }
  }
}

export default new ProjectsController;
