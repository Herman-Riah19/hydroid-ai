import { Required, Email, MaxLength } from "@tsed/schema";

export class UserCreateDto {
  @Required()
  name!: string;

  @Required()
  @Email()
  email!: string;

  @Required()
  @MaxLength(13)
  password!: string;
}

export class UserLoginDto {
  @Required()
  @Email()
  email!: string;

  @Required()
  @MaxLength(13)
  password!: string;
}
