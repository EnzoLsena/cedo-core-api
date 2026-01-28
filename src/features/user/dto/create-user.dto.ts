import { Transform } from 'class-transformer';
import {
  IsEmail,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { IsCPF } from 'src/decorators/cpf-validator.decorator';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsCPF({ message: 'Insira um CPF válido.' })
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
