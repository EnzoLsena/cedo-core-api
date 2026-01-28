import { Global, Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { HashingServiceProtocol } from './hashing/hashing.service';
import { BCryptService } from './hashing/bcrypt.service';
import { UserModule } from '../user/user.module';

@Global()
  @Module({
  imports:[UserModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: HashingServiceProtocol,
      useClass: BCryptService,
    },
  ],
  exports: [HashingServiceProtocol]
})
export class AuthModule {}
