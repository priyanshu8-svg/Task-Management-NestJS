import { SetMetadata } from "@nestjs/common";
import { Role } from "../../user/enums/role.enums.js";

export const Roles = (...roles: Role[]) => SetMetadata('roles', roles);