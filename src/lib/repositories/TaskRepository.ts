import { container, singleton } from "tsyringe";
import {
  FindManyOptions,
  FindOneOptions,
  RemoveOptions,
  Repository,
  SaveOptions,
} from "typeorm";
import DatabaseManager from "../database/DatabaseManager";
import { Task } from "../models/Task.entity";

@singleton()
export default class TaskRepository {
  private databaseManager: DatabaseManager;

  constructor() {
    this.databaseManager = container.resolve(DatabaseManager);
  }

  public async getRepository(): Promise<Repository<Task>> {
    const connection = await this.databaseManager.getConnection();
    const repository = connection.getRepository(Task);
    return repository;
  }

  public async find(
    options?: FindManyOptions<Task> | undefined
  ): Promise<Task[]> {
    const repository = await this.getRepository();
    const tasks = await repository.find(options);
    return tasks;
  }

  public async findOne(options: FindOneOptions<Task>): Promise<Task> {
    const repository = await this.getRepository();
    const task = (await repository.findOne(options)) as Task;
    return task;
  }

  public async save(
    entity: Task,
    options?: SaveOptions | undefined
  ): Promise<Task> {
    const repository = await this.getRepository();
    const savedTask = await repository.save(entity, options);
    return savedTask;
  }

  public async remove(
    entity: Task,
    options?: RemoveOptions | undefined
  ): Promise<Task> {
    const repository = await this.getRepository();
    const removedTask = await repository.remove(entity, options);
    return removedTask;
  }
}
