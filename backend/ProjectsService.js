import { ProjectModel, ProjectPhotoModel } from "./db/models.js";

class ProjectsService {
  async getAll() {
    try {
      const dbProjects = await ProjectModel.findAll();
      return dbProjects.map(async (project) => {
        const projectPhotos = await ProjectPhotoModel.findAll({
          where: {
            projectId: project.id,
          }
        });

        return { ...project.dataValues, photos: projectPhotos };
      })
    } catch (e) {
      throw e;
    }
  }

  async create(project, photos) {
    try {
      const dbProject = await ProjectModel.create(project);
      const dbPhotos = await Promise.all(
        photos.map((photo) => ProjectPhotoModel.create({ src: photo.path, projectId: dbProject.id }))
      );
      return [dbProject, dbPhotos];
    } catch (e) {
      throw e;
    }
  }
}

export default new ProjectsService;
