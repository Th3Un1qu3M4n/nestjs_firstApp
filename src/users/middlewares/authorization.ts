import { Injectable, NestMiddleware, UnauthorizedException } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';
import { User } from '../interfaces/user.interface';

@Injectable()
export class isAdminMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Hello WOrld from the Admin Middleware');
    console.log(req.user);
    // if (!req.user) {
    //   throw new UnauthorizedException();
    // } else {
    //   if (req.user.role !== 'admin') throw new UnauthorizedException();
    //   else next();
    // }
    // const user: User = req?.user;
    //     if (user) {
    //       if (user.username === 'admin') {
    //         next();
    //       } else {
    //         res.status(403).send('Invalid Auth Token Provided');
    //       }
    //     } else {
    //       res.status(403).send('Auth Token Not Provided');
    //     }
  }
}
