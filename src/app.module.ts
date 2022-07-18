import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { MongooseModule } from '@nestjs/mongoose';
import { ItemsModule } from './items/items.module';
import { UsersModule } from './users/users.module';
import config from './config/keys';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './auth/auth.module';
import entities, { User, SessionEntity } from './typeorm';
import { PassportModule } from '@nestjs/passport';

@Module({
  imports: [
    ItemsModule,
    MongooseModule.forRoot(config.mongoURI),
    UsersModule,
    TypeOrmModule.forRoot({
      type: 'mysql',
      host: config.mysql_Host,
      port: config.mysql_Port,
      username: config.mysql_user,
      password: config.mysql_pwd,
      database: config.mysql_db,
      // entities,
      entities: [User, SessionEntity],
      synchronize: true, // disable in prod
    }),
    AuthModule,
    PassportModule.register({
      session: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
