import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request, Response } from 'express';

@Injectable()
export class ValidateUserMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    console.log('Hello WOrld from the Validate User Middleware');

    const { authorization } = req.headers;

    if (authorization) {
      if (authorization === 'token123') {
        next();
      } else {
        res.status(403).send('Invalid Auth Token Provided');
      }
    } else {
      res.status(403).send('Auth Token Not Provided');
    }
  }
}
