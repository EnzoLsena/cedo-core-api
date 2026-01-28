import { IsEmail, IsNotEmpty, IsString } from 'class-validator';

export class LoginCredentialsDto {
  @IsEmail()
  @IsNotEmpty({ message: 'O campo e-mail é obrigatório.' })
  email: string;

  @IsString()
  @IsNotEmpty({ message: 'O campo senha é obrigatório.' })
  password: string;
}
