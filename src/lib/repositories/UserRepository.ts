import { container, singleton } from "tsyringe";
import {
  FindManyOptions,
  FindOneOptions,
  RemoveOptions,
  Repository,
  SaveOptions,
} from "typeorm";
import DatabaseManager from "../database/DatabaseManager";
import { User } from "../models/User.entity";

@singleton()
export default class UserRepository {
  private databaseManager: DatabaseManager;

  constructor() {
    this.databaseManager = container.resolve(DatabaseManager);
  }

  public async getRepository(): Promise<Repository<User>> {
    const connection = await this.databaseManager.getConnection();
    const repository = connection.getRepository(User);
    return repository;
  }

  public async findOne(options: FindOneOptions<User>): Promise<User> {
    const repository = await this.getRepository();
    const user = (await repository.findOne(options)) as User;
    return user;
  }

  public async count(
    options?: FindManyOptions<User> | undefined
  ): Promise<number> {
    const repository = await this.getRepository();
    const count = await repository.count(options);
    return count;
  }

  public async save(
    entity: User,
    options?: SaveOptions | undefined
  ): Promise<User> {
    const repository = await this.getRepository();
    const savedUser = await repository.save(entity, options);
    return savedUser;
  }

  public async remove(
    entity: User,
    options?: RemoveOptions | undefined
  ): Promise<User> {
    const repository = await this.getRepository();
    const removedUser = await repository.remove(entity, options);
    return removedUser;
  }
}
