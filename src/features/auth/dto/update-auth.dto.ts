import { PartialType } from '@nestjs/mapped-types';
import { LoginCredentialsDto } from './login-credentials.dto';

export class UpdateAuthDto extends PartialType(LoginCredentialsDto) {}
