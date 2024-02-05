import { Controller, Get, SetMetadata, UseGuards } from "@nestjs/common";
import { UserAuthService } from "./user-auth.service";
import { GoogleAuthGuard } from "./googleStrategy/google.guard";

//  @SetMetadata('global', false)
 @Controller('')
 export class GoogleController {
   constructor(private readonly userAuthService: UserAuthService) {}

   
   @Get('google/login')
   @UseGuards(GoogleAuthGuard)
   async googleLogin() {
     return {
       message: 'Congrats',
     };
   }


   @Get('google/redirect')
   @UseGuards(GoogleAuthGuard)
   async googleRedirect() {
     return {
       message: 'Congrats redirect',
     };
   }
 }