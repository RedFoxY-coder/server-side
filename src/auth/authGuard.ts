import { CanActivate, ExecutionContext, Injectable } from "@nestjs/common";
import { JwtService } from "@nestjs/jwt";
import { Observable } from "rxjs";
@Injectable()
export class AuthGuard implements CanActivate{
    constructor(private jwtService: JwtService) {}

    canActivate(context: ExecutionContext): boolean | Promise<boolean> | Observable<boolean> {
        const request = context.switchToHttp().getRequest()
        const authHeader: string = request.headers.authorization;
        if(!authHeader || !authHeader.startsWith('Bearer ')) {
            return false
        }

        const token = authHeader.substring(7)
        try{
            this.jwtService.verify(token)
            return true
        } catch(e) {
            return false
        }
    }
}
