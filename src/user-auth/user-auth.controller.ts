import { Body, Controller, HttpStatus, Post, Res } from '@nestjs/common';
import { UserAuthService } from './user-auth.service';
import { UserDto } from 'src/dto/user.dto';

@Controller('user')
export class UserAuthController {
    constructor(private readonly userAuthService: UserAuthService) { }
    

    @Post('signUp')
    async signUp(@Body() payload: UserDto) {
        return this.userAuthService.signUp(payload)
    }

    @Post('signIn')
    async signIn(@Body() user, @Res() res) {
        const token = await this.userAuthService.signIn(user);

        res.cookie('Authenticated', token, {
      httpOnly: true,
      maxAge:  60 * 60 * 24,
        })
        return res.status(HttpStatus.OK).json({
          success: true,
          userToken: token,
        });
    }
}
