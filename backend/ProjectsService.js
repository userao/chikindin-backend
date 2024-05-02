import * as path from 'node:path';
import { ProjectModel, ProjectPhotoModel } from "./db/models.js";

class ProjectsService {
  async getAll() {
    try {
      const dbProjects = await ProjectModel.findAll();
      return dbProjects.map(async (project) => {
        const projectPhotos = await ProjectPhotoModel.findAll({
          where: {
            projectId: project.id,
          },
        });

        return { ...project.dataValues, photos: projectPhotos };
      });
    } catch (e) {
      throw e;
    }
  }

  async getOne(projectId) {
    try {
      const dbProject = await ProjectModel.findOne({
        where: { id: projectId },
      });
      const dbPhotos = await ProjectPhotoModel.findAll({
        where: { projectId },
      });

      return { ...dbProject.dataValues, photos: dbPhotos };
    } catch (e) {
      throw e;
    }
  }

  async create(project, photos) {
    try {
      const dbProject = await ProjectModel.create(project);
      const dbPhotos = await Promise.all(
        photos.map((photo) =>
          ProjectPhotoModel.create({
            destination: photo.destination,
            filename: photo.filename,
            projectId: dbProject.id,
          })
        )
      );
      return [dbProject, dbPhotos];
    } catch (e) {
      throw e;
    }
  }

  async delete(id) {
    try {
      // const deletedPhotos = await ProjectPhotoModel.destroy({
      //   where: {
      //     projectId: id
      //   }
      // });
      console.log(path.dirname());
    } catch (e) {
      throw e;
    }
  }
}

export default new ProjectsService();
