import { Injectable, registerProvider } from "@tsed/di";
import { FindOneOptions } from "typeorm";
import { AppDataSource } from "../datasources/AppDataSource.js";
import { FineTuneJob } from "../entities/FineTuneJob.js";

export const FINE_TUNE_JOB_REPOSITORY = Symbol.for("FineTuneJobRepository");

export const FineTuneJobsRepositoryBase =
  AppDataSource.getRepository(FineTuneJob);

registerProvider({
  provide: FINE_TUNE_JOB_REPOSITORY,
  useValue: FineTuneJobsRepositoryBase,
});

@Injectable()
export class FineTuneJobsRepository {
  get repository() {
    return FineTuneJobsRepositoryBase;
  }

  async findAll(): Promise<FineTuneJob[]> {
    return this.repository.find();
  }

  async findOne(
    options: FindOneOptions<FineTuneJob>,
  ): Promise<FineTuneJob | null> {
    return this.repository.findOne(options);
  }

  async findByUser(userId: string): Promise<FineTuneJob[]> {
    return this.repository.find({ where: { userId } });
  }

  async create(job: Partial<FineTuneJob>): Promise<FineTuneJob> {
    return this.repository.save(this.repository.create(job));
  }

  async update(id: string, job: Partial<FineTuneJob>): Promise<FineTuneJob> {
    await this.repository.update(id, job);
    return (await this.findOne({ where: { id } }))!;
  }

  async delete(id: string): Promise<void> {
    await this.repository.delete(id);
  }
}
