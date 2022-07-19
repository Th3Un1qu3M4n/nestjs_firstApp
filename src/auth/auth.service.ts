import { Inject, Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from 'src/users/users.service';
import { comparePassword } from 'src/utils/bcrypt';
import { UserAuthDTO } from './dto/user-auth-dto';

@Injectable()
export class AuthService {
  constructor(@Inject('USER_SERVICE') private readonly usersService: UsersService, private jwtService: JwtService) {}

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

  async signin(userAuthDTO: UserAuthDTO) {
    const username = userAuthDTO.username;
    const password = userAuthDTO.password;
    const userFromDB = await this.usersService.findUserByUsername(username);
    // console.log(userFromDB);
    if (userFromDB) {
      if (comparePassword(password, userFromDB.password)) {
        const typeid = userFromDB.id;
        const payload = { username, typeid };
        const access_token: string = await this.jwtService.sign(payload);
        return { access_token };
      } else {
        throw new UnauthorizedException('Incorrect login credentials!');
      }
    } else {
      throw new UnauthorizedException('Incorrect login credentials!');
    }
  }
}
