import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { PassportModule } from '@nestjs/passport';
import config from 'src/config/keys';
import { UsersService } from 'src/users/users.service';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { sessionSerializer } from './utils/sessionSerializer';
import { JwtStrategy } from './utils/JWTStrategy';

@Module({
  imports: [
    PassportModule,
    JwtModule.register({
      secret: config.jwt_secret,
      signOptions: { expiresIn: '60s' },
    }),
  ],
  controllers: [AuthController],
  providers: [
    {
      provide: 'AUTH_SERVICE',
      useClass: AuthService,
    },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
    LocalStrategy,
    sessionSerializer,
    JwtStrategy,
  ],
})
export class AuthModule {}
