import { Module } from '@nestjs/common';
import { PassportModule } from '@nestjs/passport';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { UsersService } from 'src/users/users.service';
import { DataSource } from 'typeorm';
import { AuthController } from './auth.controller';
import { AuthService } from './auth.service';
import { LocalStrategy } from './utils/LocalStrategy';
import { sessionSerializer } from './utils/sessionSerializer';
import { DatabaseModule } from '../typeorm/database.module';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  // imports: [DatabaseModule],
  imports: [],
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
    // {
    //   provide: 'USER_REPOSITORY',
    //   useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    //   inject: ['DATA_SOURCE'],
    // },
    LocalStrategy,
    sessionSerializer,
  ],
})
export class AuthModule {}
