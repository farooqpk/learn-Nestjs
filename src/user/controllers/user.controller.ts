import {
  Controller,
  Get,
  UseGuards,
} from '@nestjs/common';

import { JwtGuard } from 'src/auth/guard';
import { GetUser } from 'src/auth/decorator';


@UseGuards(JwtGuard) // now it applicable for all route under the controller
@Controller('users')
export class UserController {
  // if we put above the routes like @UseGuards(JwtGuard) it will applicable for that rotue only
  @Get('me')
  getMe(@GetUser() user) {
   return user
  }

  @Get('sayname')
  sayname(@GetUser() user) {
    return user
  }
}
