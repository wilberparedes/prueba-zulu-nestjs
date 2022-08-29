import { PartialType } from '@nestjs/swagger';
import { LoginAuthDto } from './login-auth.dto';

export class RegisterAuthDto extends PartialType(LoginAuthDto) {
  fullName: string;
  cedula: string;
  direccional: string;
}
