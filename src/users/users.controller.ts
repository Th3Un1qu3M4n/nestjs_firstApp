import {
  BadRequestException,
  Body,
  ClassSerializerInterceptor,
  Controller,
  Delete,
  Get,
  Inject,
  Param,
  Post,
  Put,
  Req,
  Res,
  UploadedFile,
  UseGuards,
  UseInterceptors,
  UsePipes,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { SerializedUser } from './interfaces/user.interface';
import { UserNotFoundException } from './exceptions/UserNotFound.exception';
import { CreateUserDTO } from './dto/create-user.dto';
import { ValidationPipe } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { IsAuthenticatedGaurd } from 'src/auth/utils/LocalGuard';
import { Request } from 'express';
import { IsAdminGaurd } from './Gaurds/isAdmin.gaurd';
import { FileInterceptor } from '@nestjs/platform-express';
import { removeFile, saveImageToStorage } from '../utils/imageStorage';

@Controller('users')
export class UsersController {
  constructor(@Inject('USER_SERVICE') private readonly usersService: UsersService) {}

  @Put('avatar')
  @UseGuards(IsAuthenticatedGaurd)
  @UseInterceptors(FileInterceptor('file', saveImageToStorage))
  getImage(@UploadedFile() file: Express.Multer.File, @Req() req) {
    const fileName = file?.filename;
    if (!fileName) throw new BadRequestException('Only PNG, JPG, JPEG allowed');

    return this.usersService.uploadUserImg(req.user.id, fileName);
  }
  // @UseGuards(AuthGuard('jwt'))
  @Get('avatar')
  @UseGuards(IsAuthenticatedGaurd)
  async uploadImage(@Req() req, @Res() res) {
    const filename = await this.usersService.findUserImageById(req.user.id);
    res.sendFile(filename, { root: './images' });
  }

  @Delete('avatar')
  @UseGuards(IsAuthenticatedGaurd)
  async deleteImage(@Req() req) {
    const filename = await this.usersService.deleteUserImageById(req.user.id);
    return await removeFile(filename);
  }

  @UseGuards(AuthGuard('jwt'))
  @Get()
  getUsers(@Req() req: Request) {
    console.log(req.user);
    return this.usersService.findUsers();
  }

  // @UseGuards(IsAuthenticatedGaurd)
  @UseGuards(IsAdminGaurd)
  @UseInterceptors(ClassSerializerInterceptor)
  @Get(':username')
  async getUserByUsername(@Param('username') username: string) {
    const user = await this.usersService.findUserByUsername(username);

    if (user) return new SerializedUser(user);
    // else throw new NotFoundException();
    else throw new UserNotFoundException();
  }

  @Post()
  @UsePipes(ValidationPipe)
  createUser(@Body() createUserDTO: CreateUserDTO) {
    return this.usersService.createUser(createUserDTO);
  }
}
