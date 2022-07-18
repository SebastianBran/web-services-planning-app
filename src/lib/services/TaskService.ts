import { plainToClass } from "class-transformer";
import { container, singleton } from "tsyringe";
import BusinessError from "../common/BussinessError";
import PlanningConstans from "../common/Constans";
import StringUtils from "../common/StringUtils";
import { UserClaims } from "../common/UserClaims";
import { TaskSaveDTO } from "../dtos/task/TaskSaveDTO";
import { TaskUpdateDTO } from "../dtos/task/TaskUpdateDTO";
import { Task } from "../models/Task.entity";
import TaskRepository from "../repositories/TaskRepository";

@singleton()
export default class TaskService {
  private taskRepository: TaskRepository;

  constructor() {
    this.taskRepository = container.resolve(TaskRepository);
  }

  async getAll(): Promise<Task[]> {
    try {
      const userClaims = container.resolve(UserClaims);
      const tasks = await this.taskRepository.find({
        select: {
          user: {
            id: false,
            name: false,
            email: false,
            role: false,
            password: false,
          },
        },
        relations: {
          user: true,
        },
        where: {
          user: {
            id: userClaims.payload.id,
          },
        },
      });
      return tasks;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async getById(id: number): Promise<Task> {
    try {
      const task = await this.taskRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!task) {
        const errorMessage = StringUtils.format(
          PlanningConstans.MESSAGE_RESPONSE_NOT_FOUND,
          "Task",
          id.toString()
        );
        const notFoundError = new BusinessError(errorMessage, 404);
        return Promise.reject(notFoundError);
      }

      return task;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async create(dto: TaskSaveDTO): Promise<Task> {
    try {
      const entity = plainToClass(Task, dto);
      const task = await this.taskRepository.save(entity);
      return task;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async update(id: number, dto: TaskUpdateDTO): Promise<Task> {
    try {
      const entity = await this.taskRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!entity) {
        const errorMessage = StringUtils.format(
          PlanningConstans.MESSAGE_RESPONSE_NOT_FOUND,
          "Task",
          id.toString()
        );
        const notFoundError = new BusinessError(errorMessage, 404);
        return Promise.reject(notFoundError);
      }

      entity.name = dto.name;
      entity.description = dto.description;
      entity.status = dto.status;

      const task = await this.taskRepository.save(entity);
      return task;
    } catch (error) {
      return Promise.reject(error);
    }
  }

  async delete(id: number): Promise<any> {
    try {
      const entity = await this.taskRepository.findOne({
        where: {
          id: id,
        },
      });

      if (!entity) {
        const errorMessage = StringUtils.format(
          PlanningConstans.MESSAGE_RESPONSE_NOT_FOUND,
          "Task",
          id.toString()
        );
        const notFoundError = new BusinessError(errorMessage, 404);
        return Promise.reject(notFoundError);
      }

      const result = await this.taskRepository.remove(entity);
      return result;
    } catch (error) {
      return Promise.reject(error);
    }
  }
}
