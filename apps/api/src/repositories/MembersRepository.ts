import { Injectable, registerProvider } from "@tsed/di";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { Member } from "../entities/Member.js";

export const MEMBER_REPOSITORY = Symbol.for("MemberRepository");

export const MembersRepositoryBase = AppDataSource.getRepository(Member);

registerProvider({
  provide: MEMBER_REPOSITORY,
  useValue: MembersRepositoryBase,
});

@Injectable()
export class MembersRepository {
  get repository() {
    return MembersRepositoryBase;
  }

  async findAll(): Promise<Member[]> {
    return this.repository.find();
  }

  async findOne(options: FindOneOptions<Member>): Promise<Member | null> {
    return this.repository.findOne(options);
  }

  async findByUser(userId: string): Promise<Member[]> {
    return this.repository.find({ where: { userId } });
  }

  async create(member: Partial<Member>): Promise<Member> {
    return this.repository.save(this.repository.create(member));
  }

  async update(id: string, member: Partial<Member>): Promise<Member> {
    await this.repository.update(id, member);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
