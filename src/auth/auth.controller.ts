import { Body, Controller, Get, Inject, Post, Session, UseGuards } from '@nestjs/common';
import { LocalGuard } from './utils/LocalGuard';
import { AuthService } from './auth.service';
import { UserAuthDTO } from './dto/user-auth-dto';

@Controller('auth')
export class AuthController {
  constructor(@Inject('AUTH_SERVICE') private readonly authService: AuthService) {}
  @UseGuards(LocalGuard)
  @Post('login')
  async login() {
    return 'User Logged In';
  }

  @Post('JWT')
  async JWTLoginRoute(@Body() userAuthDTO: UserAuthDTO) {
    return this.authService.signin(userAuthDTO);
  }

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    return session;
  }

  // @UseGuards(IsAuthenticatedGaurd)
  // @Get('status')
  // async getAuthStatus(@Req() req: Request) {
  //   return req.user;
  // }
}
