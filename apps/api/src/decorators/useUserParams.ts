import { useDecorators } from "@tsed/core";
import { RawPathParams, UsePipe } from "@tsed/platform-params";
import { UserPipe } from "src/pipes/UserPipe";

export function UseUserParams(expression: string): ParameterDecorator {
    return useDecorators(
        RawPathParams(expression),
        UsePipe(UserPipe)
    );
}