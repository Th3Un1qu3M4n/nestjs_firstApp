import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidateUserMiddleware } from './middlewares/validate-user.middleware';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from 'src/typeorm/User';
import { DataSource } from 'typeorm';
import { DatabaseModule } from 'src/typeorm/database.module';

@Module({
  // imports: [TypeOrmModule.forFeature([User])],
  // imports: [DatabaseModule],
  imports: [],
  controllers: [UsersController],
  providers: [
    // {
    //   provide: 'USER_REPOSITORY',
    //   useFactory: (dataSource: DataSource) => dataSource.getRepository(User),
    //   inject: ['DATA_SOURCE'],
    // },
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
})
export class UsersModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(ValidateUserMiddleware).forRoutes({
      path: 'users/:username',
      method: RequestMethod.GET,
    });
  }
}
