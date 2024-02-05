import { Injectable, UnauthorizedException } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { ExtractJwt, Strategy } from "passport-jwt";
import { UserAuthService } from "../user-auth.service";


@Injectable()
export class JwtSrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserAuthService) {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
          secretOrKey: process.env.JWT_ENCODE,
        });
    }

    async validate(payload: any) {
        return  {
            id: payload.sub,
            email:payload.email
        }
    }

    // async googleValidation(payload: any) {
    //     const user = await this.userService.googleSignIn(payload.email)
    //     //  if (!user) {
    //     //    throw new UnauthorizedException();
    //     //  }
    //      return user;
    // }
}