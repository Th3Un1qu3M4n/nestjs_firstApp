import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common';

@Injectable()
export class IsAdminGaurd implements CanActivate {
  async canActivate(context: ExecutionContext): Promise<any> {
    const req = context.switchToHttp().getRequest();
    console.log(req.user);
    if (req.isAuthenticated()) return req.user.role === 'admin';
    else return false;
  }
}
