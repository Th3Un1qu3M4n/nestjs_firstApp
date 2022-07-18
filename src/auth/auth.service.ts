import { Inject, Injectable } from '@nestjs/common';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly usersService: UsersService) {}

  async validateUser(username: string, password: string) {
    const userFromDB = await this.usersService.findUserByUsername(username);
    if (userFromDB) {
      if (comparePassword(password, userFromDB.password)) {
        console.log('User successfully validated');
        return userFromDB;
      }
      console.log('User Not Valid');
      return null;
    }

    console.log('User Not Valid');
    return null;
  }
}
