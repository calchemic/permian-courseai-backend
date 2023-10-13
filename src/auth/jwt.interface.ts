import { Role } from '../model/user.model';

export interface JwtPayload {
  id: string;
  role: Role;
  firstName: string;
  lastName: string;
  email: string;
}
