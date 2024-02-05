import { Injectable } from "@nestjs/common";
import { PassportStrategy } from "@nestjs/passport";
import { InjectRepository } from "@nestjs/typeorm";
import { Profile, Strategy, VerifyCallback } from "passport-google-oauth20";
import { UserAuthService } from "../user-auth.service";
import { VerifiedCallback } from "passport-jwt";
// import { GoogleService } from "../google.service";


@Injectable()
export class GoogleStrategy extends PassportStrategy(Strategy) {
    constructor(private readonly userService: UserAuthService) {
        super({
          clientID: process.env.CLIENT_ID,
          clientSecret: process.env.CLIENT_SECRET,
          callbackURL: 'http://127.0.0.1:2001/google/redirect',
          scope: ['profile', 'email'],
        });
    }

    async validate(accessToken: string, refreshToken: string, profile: Profile,) {
        console.log(accessToken)
        console.log(refreshToken)
        console.log(profile)

        const user = await this.userService.googleSignIn({
            email: profile.emails[0].value, 
            displayName: profile.displayName
        })
         return user
    }
}