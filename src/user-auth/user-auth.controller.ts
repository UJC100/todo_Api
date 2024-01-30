import { Body, Controller, Get, HttpStatus, Param, Post, Req, Res, UseGuards } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserDto } from 'src/dto/user.dto';
import { JwtAuthGuard } from './jwt-auth/jwt.auth.guard';
import { ResetPasswordDto } from 'src/dto/reset-password.dto';
import { ForgotPasswordDto } from 'src/dto/forgot-password.entity';
import { GoogleAuthGuard } from './googleStrategy/google.guard';

@Controller('user')
export class UserAuthController {
  constructor(private readonly userAuthService: UserAuthService) {}

  @Post('signUp')
  async signUp(@Body() payload: UserDto) {
    return this.userAuthService.signUp(payload);
  }

  @Post('signIn')
  async signIn(@Body() user, @Res() res) {
    const token = await this.userAuthService.signIn(user);

    res.cookie('Authenticated', token, {
      httpOnly: true,
      maxAge: 60 * 60 * 24,
    });
    return res.status(HttpStatus.OK).json({
      success: true,
      userToken: token,
    });
  }

  @Get()
//   @UseGuards(JwtAuthGuard)
  async getAll() {
      return await this.userAuthService.getAll();   
  }

  @Get(':userName')
  async getUser(@Param('userName') payload: string) {
    return await this.userAuthService.getUser(payload)
  }

  @Post('forgotPassword')
  async forgotPassword(@Body() payload: ForgotPasswordDto) {
    return await this.userAuthService.forgotPassword(payload)
  }

  @Post('resetPassword/:userId/:token')
  async resetPassword(@Body() payload: ResetPasswordDto, @Param('userId') userId: string, @Param('token') token: string) {
    console.log(userId, token)

    return await this.userAuthService.resetPassword(payload, userId, token)
  }
}
