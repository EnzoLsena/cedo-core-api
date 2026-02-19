import { BadRequestException, Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { LoginCredentialsDto } from './dto/login-credentials.dto';
import { UserService } from '../user/user.service';
import { HashingServiceProtocol } from './hashing/hashing.service';
import jwtConfig from './config/jwt.config';
import { ConfigType } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly hashingService: HashingServiceProtocol,
    @Inject(jwtConfig.KEY)
    private readonly jwtConfiguration: ConfigType<typeof jwtConfig>,
    private readonly jwtService: JwtService,
  ) {}

  async login(loginCredentialsDto: LoginCredentialsDto) {
    const user = await this.userService.findByEmail(loginCredentialsDto.email);

    if (!user) {
      throw new BadRequestException(
        'Credenciais inválidas, tente novamente.',
      );
    }

    const passwordMatches = await this.hashingService.compare(
      loginCredentialsDto.password,
      user.password,
    );

    if (!passwordMatches) {
      throw new BadRequestException(
        'Credenciais inválidas, tente novamente.',
      );
    }

    const accessToken = await this.jwtService.signAsync(
      { id: user.id, sub: user.id, email: user.email },
      {
        secret: this.jwtConfiguration.secret,
        expiresIn: this.jwtConfiguration.ttl,
      },
    );
    return {
      accessToken,
    };
  }
}
