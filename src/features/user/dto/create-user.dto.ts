import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  cpf: string;

  @IsPhoneNumber('BR', { message: 'Insira um número de telefone válido.' })
  @IsNotEmpty()
  @Transform(({ value }) => value.replace(/\D/g, ''))
  phone: string;

  @IsStrongPassword({ minLength: 8 }, { message: 'Insira uma senha segura.' })
  @IsNotEmpty()
  password: string;

  @IsEmail({}, { message: 'Insira um e-mail válido.' })
  @IsNotEmpty()
  email: string;
}
