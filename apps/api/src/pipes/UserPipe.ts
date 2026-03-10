import { Inject, Injectable } from "@tsed/di";
import { JsonParameterStore, PipeMethods } from "@tsed/schema";
import { NotFound } from "@tsed/exceptions";
import { UserService } from "src/services/UserService";
import { User } from "src/entities";

@Injectable()
export class UserPipe implements PipeMethods<string, Promise<User>> {
  @Inject()
  protected userService!: UserService;

  async transform(
    id: string,
    metadata: JsonParameterStore,
  ): Promise<User> {
    const user = await this.userService.findOne(id);

    if (!user) {
      throw new NotFound(`User with id ${id} not found`);
    }

    return user;
  }
}
