import { MiddlewareConsumer, Module, NestModule, RequestMethod } from '@nestjs/common';
import { UsersController } from './users.controller';
import { UsersService } from './users.service';
import { ValidateUserMiddleware } from './middlewares/validate-user.middleware';
// import { isAdminMiddleware } from './middlewares/authorization';

@Module({
  imports: [],
  controllers: [UsersController],
  providers: [
    {
      provide: 'USER_SERVICE',
      useClass: UsersService,
    },
  ],
})
export class UsersModule {}
// export class UsersModule implements NestModule {
//   configure(consumer: MiddlewareConsumer) {
//     consumer.apply(ValidateUserMiddleware).forRoutes({
//       path: 'users/:username',
//       method: RequestMethod.GET,
//     });
//   }
// }
