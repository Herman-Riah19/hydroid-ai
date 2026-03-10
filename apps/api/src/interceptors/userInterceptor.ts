import {
  Interceptor,
  InterceptorContext,
  InterceptorMethods,
  InterceptorNext,
} from "@tsed/di";
import { Logger } from "@tsed/logger";

@Interceptor()
export class UserInterceptor implements InterceptorMethods {
  constructor(private logger: Logger) {}

  async intercept(context: InterceptorContext<any>, next: InterceptorNext) {
    const result = await next();

    this.logger.info("Sanitizing user output");

    return this.sanitize(result);
  }

  /**
   * Remove password from any returned object / array
   */
  private sanitize(data: any): any {
    if (!data) return data;

    if (Array.isArray(data)) {
      return data.map((item) => this.sanitize(item));
    }

    if (typeof data === "object") {
      if (data instanceof Date) return data;

      const clone: any = { ...data };

      // remove password
      if ("password" in clone) {
        delete clone.password;
      }

      // sanitize nested objects
      for (const key of Object.keys(clone)) {
        const value = clone[key];
        if (typeof value === "object" && value !== null) {
          clone[key] = this.sanitize(value);
        }
      }

      return clone;
    }

    return data;
  }
}
