import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingServiceProtocol } from './hashing/hashing.service';
import { BCryptService } from './hashing/bcrypt.service';
import { UserModule } from '../user/user.module';
import { ConfigModule } from '@nestjs/config';
import jwtConfig from './config/jwt.config';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import { JwtStrategy } from './strategies/jwt.strategy';

@Global()
@Module({
  imports: [
    UserModule,
    PassportModule,
    ConfigModule.forFeature(jwtConfig),
    JwtModule.registerAsync(jwtConfig.asProvider()),
  ],
  controllers: [AuthController],
  providers: [
    AuthService,
    JwtStrategy,
    {
      provide: HashingServiceProtocol,
      useClass: BCryptService,
    },
  ],
  exports: [AuthService, HashingServiceProtocol],
})
export class AuthModule {}
