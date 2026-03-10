import { Req } from "@tsed/platform-http";
import { Context } from "@tsed/platform-params";
import { Middleware, MiddlewareMethods } from "@tsed/platform-middlewares";
import { Forbidden, Unauthorized } from "@tsed/exceptions";
import jwt from "jsonwebtoken";

interface JwtPayload {
  id: string;
  email: string;
  role: string;
}

@Middleware()
export class UserAuthMiddleware implements MiddlewareMethods {
  public use(@Req() request: Req, @Context() ctx: Context) {
    // retrieve options given to the @UseAuth decorator
    const options = ctx.endpoint.get(UserAuthMiddleware) || {};

    // Get token from Authorization header
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      throw new Unauthorized("No token provided");
    }

    const token = authHeader.substring(7); // Remove 'Bearer ' prefix

    try {
      // Verify token
      const decoded = jwt.verify(
        token,
        process.env.JWT_SECRET || "default-secret-key",
      ) as JwtPayload;

      // Attach user to request
      (request as any).user = decoded;

      // Check role if specified
      if (options.role && decoded.role !== options.role) {
        throw new Forbidden("Forbidden");
      }
    } catch (error) {
      throw new Unauthorized("Invalid token");
    }
  }
}
