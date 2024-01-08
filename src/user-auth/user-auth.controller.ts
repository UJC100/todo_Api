import { Body, Controller, Get, HttpStatus, Param, Post, Res, UseGuards } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserDto } from 'src/dto/user.dto';
import { JwtAuthGuard } from './jwt-auth/jwt.auth.guard';

@Controller('user')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('signUp')
  async signUp(@Body() payload: UserDto) {
    return this.userAuthService.signUp(payload);
  }

//   @Post('signIn')
//   async signIn(@Body() user, @Res() res) {
//     const token = await this.userAuthService.signIn(user);

//     res.cookie('Authenticated', token, {
//       httpOnly: true,
//       maxAge: 60 * 60 * 24,
//     });
//     return res.status(HttpStatus.OK).json({
//       success: true,
//       userToken: token,
//     });
//   }

//   @Get()
// //   @UseGuards(JwtAuthGuard)
//   async getAll() {
//       return await this.userAuthService.getAll();   
//   }

//   @Get(':userName')
//   async getUser(@Param('userName') payload: string) {
//     return await this.userAuthService.getUser(payload)
  // }
}
