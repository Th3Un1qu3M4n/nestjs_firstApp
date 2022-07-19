import { Injectable, NotFoundException } from '@nestjs/common';
import { plainToClass } from 'class-transformer';
import { User, SerializedUser } from './interfaces/user.interface';
import { CreateUserDTO } from './dto/create-user.dto';
import { User as UserEntity } from 'src/typeorm/User';
import { encodePasswrod } from 'src/utils/bcrypt';
import { AppDataSource } from 'src/typeorm/AppDataSource';
import { removeFile } from '../utils/imageStorage';

@Injectable()
export class UsersService {
  // constructor(@InjectRepository(UserEntity) private readonly userRepository: Repository<UserEntity>) {}
  // constructor(@Inject('USER_REPOSITORY') private userRepository: Repository<UserEntity>) {}
  // private users: User[] = [
  //   {
  //     username: 'ahmed',
  //     password: 'pass123',
  //   },
  //   {
  //     username: 'faiq',
  //     password: 'pass',
  //   },
  //   {
  //     username: 'awais',
  //     password: 'pass234',
  //   },
  // ];

  // getUsers() {
  //   return this.users.map((user) => plainToClass(SerializedUser, user));
  // }
  // getUsersByUsername(username: string) {
  //   return this.users.find((user) => user.username === username);
  // }

  createUser(createUserDto: CreateUserDTO) {
    const hashedPwd = encodePasswrod(createUserDto.password);
    const userRepository = AppDataSource.getRepository(UserEntity);
    // const newUser = this.userRepository.create({ ...createUserDto, password: hashedPwd });
    const newUser = userRepository.create({ ...createUserDto, role: 'user', password: hashedPwd });
    return userRepository.save(newUser);
  }

  async findUsers() {
    const userRepository = AppDataSource.getRepository(UserEntity);
    console.log('searching all users');
    return (await userRepository.find()).map((user) => plainToClass(SerializedUser, user));
  }
  findUserByUsername(username: string) {
    const userRepository = AppDataSource.getRepository(UserEntity);
    console.log('searching username');
    return userRepository.findOneBy({ username });
  }
  findUserById(id: number) {
    const userRepository = AppDataSource.getRepository(UserEntity);
    return userRepository.findOneBy({ id });
  }
  async uploadUserImg(id: number, imgPath: string) {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const path = await userRepository.findOneBy({ id }).then((user) => user.imagePath);
    if (path) removeFile(path);
    const user: UserEntity = new UserEntity();
    user.imagePath = imgPath;
    return userRepository.update(id, user);
  }

  async findUserImageById(id: number) {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const path = await userRepository.findOneBy({ id }).then((user) => user.imagePath);
    // console.log(path);
    if (!path) throw new NotFoundException('Image not found');
    return path;
  }
  async deleteUserImageById(id: number) {
    const userRepository = AppDataSource.getRepository(UserEntity);
    const path = await userRepository.findOneBy({ id }).then((user) => user.imagePath);
    // console.log(path);
    if (!path) throw new NotFoundException('Image not found');
    const user: UserEntity = new UserEntity();
    user.imagePath = null;
    await userRepository.update(id, user);
    return path;
  }
}
