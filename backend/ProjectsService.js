import path from "path";
import fs from "node:fs/promises";
import { ProjectModel, ProjectPhotoModel } from "./db/models.js";

class ProjectsService {
  async getAll() {
    const dbProjects = await ProjectModel.findAll();
    return dbProjects.map(async (project) => {
      const projectPhotos = await ProjectPhotoModel.findAll({
        where: {
          projectId: project.id,
        },
      });

      return { ...project.dataValues, photos: projectPhotos };
    });
  }

  async getOne(projectId) {
    const dbProject = await ProjectModel.findOne({
      where: { id: projectId },
    });
    if (!dbProject) throw new Error('project not found in database');
    const dbPhotos = await ProjectPhotoModel.findAll({
      where: { projectId },
    });

    return { ...dbProject.dataValues, photos: dbPhotos };
  }

  async create(project, photos) {
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
  }

  async delete(id) {
    const deletedPhotos = await ProjectPhotoModel.destroy({
      where: {
        projectId: id,
      },
    });
    const photosDir = path.join(`${process.cwd()}/uploads`);
    (await fs.readdir(photosDir)).forEach((p) => {
      const [projectId] = p.split("_");
      if (projectId === id) {
        fs.rm(path.join(photosDir, p));
      }
    });
    const deletedProjects = await ProjectModel.destroy({
      where: {
        id,
      },
    });

    return { deletedPhotos, deletedProjects };
  }
}

export default new ProjectsService();
