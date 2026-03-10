import { Controller, Inject, Intercept } from "@tsed/di";
import { BodyParams, Context } from "@tsed/platform-params";
import { User } from "../entities/User.js";
import {
  Get,
  Groups,
  Post,
  Returns,
  Summary,
  Title,
  Description,
} from "@tsed/schema";
import { UserCreateDto, UserLoginDto } from "src/validators/UserDto";
import { UserService } from "src/services/UserService";
import { UserInterceptor } from "src/interceptors/userInterceptor";
import { Docs } from "@tsed/swagger";
import { UseUserParams } from "src/decorators/useUserParams";
import { UseAuth } from "@tsed/platform-middlewares";
import { UserAuthMiddleware } from "src/middlewares/userMiddleware";
import { Logger } from "@tsed/logger";

@Controller("/users")
@Docs("api-docs")
export class UserController {
  constructor(@Inject() protected service: UserService, private logger: Logger) {}

  @Post("/register")
  @Title("Create User")
  @Summary("Create a new user")
  @Description("This endpoint allows you to create a new user.")
  @Returns(201, User)
  async signupUser(
    @BodyParams() @Groups("creation") user: UserCreateDto,
  ): Promise<User> {
    this.logger.info("Creating a new user with email: %s", user.email);
    return this.service.register(user);
  }

  @Post("/login")
  @Title("User Login")
  @Summary("Login user")
  @Description("This endpoint allows users to log in.")
  @Returns(200, Object)
  async signinUser(
    @BodyParams() @Groups("creation") user: UserLoginDto,
  ): Promise<{ user: User; token: string }> {
    return this.service.login(user);
  }

  @Get("/")
  @Title("Get Users")
  @Summary("Filter user by name or content")
  @Description(
    "This endpoint retrieves a list of users filtered by name or content.",
  )
  @(Returns(200, Array).Of(User).Description("Return a list of User"))
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  @Intercept(UserInterceptor)
  getAll() {
    return this.service.findAll();
  }

  @Get("/:id")
  @Title("Get User by ID")
  @Summary("Get a single user by its unique ID")
  @Description(
    "This endpoint retrieves a single user by their unique identifier.",
  )
  @Returns(200, User)
  @UseAuth(UserAuthMiddleware, { role: "VIEWER" })
  @Intercept(UserInterceptor)
  getUserById(@UseUserParams("id") user: User) {
    return user;
  }
}
