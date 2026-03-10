import { Injectable, Inject, registerProvider } from "@tsed/di";
import { DataSource, FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { User } from "../entities/User.js";

export const USER_REPOSITORY = Symbol.for("UserRepository");

export const UserRepository = AppDataSource.getRepository(User).extend({
  findByEmail(email: string) {
    return this.findOne({ where: { email } });
  },
});

registerProvider({
  provide: USER_REPOSITORY,
  useValue: UserRepository,
});

@Injectable()
export class UsersRepository {
  get repository() {
    return UserRepository;
  }

  async findAll(): Promise<User[]> {
    return this.repository.find();
  }

  async findOne(options: FindOneOptions<User>): Promise<User | null> {
    return this.repository.findOne(options);
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.repository.findOne({ where: { email } });
  }

  async create(user: Partial<User>): Promise<User> {
    return this.repository.save(this.repository.create(user));
  }

  async update(id: string, user: Partial<User>): Promise<User> {
    await this.repository.update(id, user);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
