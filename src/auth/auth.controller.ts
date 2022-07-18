import { Controller, Get, Post, Req, Session, UseGuards } from '@nestjs/common';
import { Request } from 'express';
import { LocalGuard, IsAuthenticatedGaurd } from './utils/LocalGuard';

@Controller('auth')
export class AuthController {
  @UseGuards(LocalGuard)
  @Post('login')
  async login() {
    return 'User Logged In';
  }

  @Get('')
  async getAuthSession(@Session() session: Record<string, any>) {
    console.log(session);
    return session;
  }

  @UseGuards(IsAuthenticatedGaurd)
  @Get('status')
  async getAuthStatus(@Req() req: Request) {
    return req.user;
  }
}
