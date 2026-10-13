import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { payloadDto } from 'src/user/dto/payload.dto';
@Injectable()
export class TokenService {

     constructor( 
            private jwtService: JwtService,
        ){}

     async generateToken(payload: payloadDto): Promise<{token: string}> {
            return {
                token: this.jwtService.sign(payload)
            }
        }
}
