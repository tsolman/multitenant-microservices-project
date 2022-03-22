import { UserRole } from '../types';

export class CreateUserRequest {
  name: string;
  last_name: string;
  role: UserRole;
}
