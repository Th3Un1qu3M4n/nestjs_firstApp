import config from 'src/config/keys';
import { DataSource } from 'typeorm';
import { SessionEntity } from './SessionEntity';
import { User } from './User';

export const AppDataSource = new DataSource({
  type: 'mysql',
  host: config.mysql_Host,
  port: config.mysql_Port,
  username: config.mysql_user,
  password: config.mysql_pwd,
  database: config.mysql_db,
  entities: [User, SessionEntity],
  synchronize: false,
});
