import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserService } from '../user/user.service';
import { HashingServiceProtocol } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    @Inject(jwtConfig.KEY)
    private readonly userService: UserService,
    private readonly hashingService: HashingServiceProtocol,
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
  ) {}

  async login(loginCredentialsDto: LoginCredentialsDto) {
    const user = await this.userService.findByEmail(loginCredentialsDto.email);

    if (!user) {
      throw new UnauthorizedException(
        'Credenciais inválidas, tente novamente.',
      );
    }

    const passwordMatches = await this.hashingService.compare(
      loginCredentialsDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new UnauthorizedException(
        'Credenciais inválidas, tente novamente.',
      );
    }
    return {
      message: "Va tomar no cu"
    }
  }
}
