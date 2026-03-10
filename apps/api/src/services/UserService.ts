import { ErrorMsg } from "@tsed/schema";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import { Injectable, Intercept } from "@tsed/di";
import { UserLoginDto } from "src/validators/UserDto";
import { UsersRepository } from "../repositories/UsersRepository.js";
import { User } from "../entities/User.js";
import { BadRequest } from "@tsed/exceptions";
import { UserInterceptor } from "src/interceptors/userInterceptor.js";

@Injectable()
export class UserService extends UsersRepository {
  async register(data: {
    email: string;
    name?: string;
    password?: string;
  }): Promise<User> {
    const existUser = await this.findByEmail(data.email);

    if (existUser) {
      throw new BadRequest("User already exists");
    }

    let password = "";
    if (data.password) {
      const salt = await bcrypt.genSalt();
      password = await bcrypt.hash(data.password, salt);
    }

    return this.create({
      email: data.email,
      name: data.name,
      password: password,
    });
  }

  @Intercept(UserInterceptor)
  async login(auth: UserLoginDto) {
    const existUser = await this.findByEmail(auth.email);

    if (!existUser) throw ErrorMsg({ error: "User not found" });
    if (!existUser.password) throw ErrorMsg({ error: "Password not found" });

    const isPasswordValid = await this.isPasswordValid(
      auth.password,
      existUser.password,
    );

    if (!isPasswordValid) throw ErrorMsg({ error: "Invalid Password" });

    const token = jwt.sign(
      {
        id: existUser.id,
        email: existUser.email,
        role: existUser.role,
      },
      process.env.JWT_SECRET || "default-secret-key",
      { expiresIn: "24h" },
    );

    return {
      user: existUser,
      token,
    };
  }

  private async isPasswordValid(
    plainPassword: string,
    hashedPassword: string,
  ): Promise<boolean> {
    return bcrypt.compare(plainPassword, hashedPassword);
  }
}
