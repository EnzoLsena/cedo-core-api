import { Transform } from 'class-transformer';
import {
  IsBoolean,
  IsEmail,
  IsEnum,
  IsNotEmpty,
  IsPhoneNumber,
  IsString,
  IsStrongPassword,
} from 'class-validator';
import { EUserType } from 'src/common/enum/user-type.enum';

export class CreateUserDto {
  @IsString()
  @IsNotEmpty()
  name: string;

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

  @IsEnum(EUserType, { message: 'O tipo do usuário é obrigatório.' })
  @IsNotEmpty()
  role: EUserType;

  @IsBoolean({ message: 'O status do usuário é obrigatório' })
  isActive: true;
}
