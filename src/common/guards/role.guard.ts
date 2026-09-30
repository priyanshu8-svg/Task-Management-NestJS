import { CanActivate, Injectable, ExecutionContext } from "@nestjs/common";
import { Reflector } from "@nestjs/core";
import { Role } from "../../user/enums/role.enums.js";

@Injectable()
export class RolesGuard implements CanActivate {
    constructor(private readonly reflector: Reflector) { }



    canActivate(context: ExecutionContext): boolean {
        const requiredRoles = this.reflector.get<Role[]>(
            'roles',
            context.getHandler(),
        );

        // If no @Roles() is specified,
        // allow the request
        if (!requiredRoles) {
            return true;
        }

        const request = context.switchToHttp().getRequest();

        const user = request.user;

        // Check whether user's role is allowed
        return requiredRoles.includes(user.role);
    }
}