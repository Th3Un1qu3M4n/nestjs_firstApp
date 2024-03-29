import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as session from 'express-session';
import * as passport from 'passport';
import config from './config/keys';
import { AppDataSource } from './typeorm/AppDataSource';
// import { TypeormStore } from 'connect-typeorm/out';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // const myDataSource = new DataSource({});
  // let connection;
  // // console.log(getConnection());
  // if (!getConnectionManager().has('default')) {
  //   const connectionOptions = await getConnectionOptions();
  //   connection = await createConnection(connectionOptions);
  // } else {
  //   connection = getConnection();
  // }

  // const connection = await createConnection({
  //   type: 'mysql',
  //   host: config.mysql_Host,
  //   port: config.mysql_Port,
  //   username: config.mysql_user,
  //   password: config.mysql_pwd,
  //   database: config.mysql_db,
  //   // entities,
  //   entities: [User, SessionEntity],
  //   synchronize: true, // disable in prod
  // });

  AppDataSource.initialize()
    .then(() => {
      console.log('Data Source has been initialized!');
    })
    .catch((err) => {
      console.error('Error during Data Source initialization', err);
    });

  // const sessionRepository = AppDataSource.getRepository(SessionEntity);
  app.use(
    session({
      secret: config.session_secret,
      resave: false,
      saveUninitialized: false,
      cookie: {
        maxAge: 10 * 60 * 1000, //min * sec * milliSeconds
      },
      // store: new TypeormStore({ limitSubquery: false }).connect(sessionRepository),
    }),
  );

  app.use(passport.initialize());
  app.use(passport.session());

  await app.listen(3000);
}
bootstrap();
