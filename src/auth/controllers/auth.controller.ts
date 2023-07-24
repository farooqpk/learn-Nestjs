import {
  Body,
  Controller,
  HttpCode,
  Post,
} from '@nestjs/common';
import { AuthService } from '../services/auth.service';
import { UserDto } from '../dto';


@Controller() // it mean '/'
export class AuthController {
  constructor(
    private readonly authService: AuthService,
  ) {}

  @Post('signup') // '/signup'
  @HttpCode(201)
    signup(@Body() userDto: UserDto) {
    return this.authService.signup(userDto);
  }

  @Post('login')
  @HttpCode(200)
  async login(@Body() userDto:UserDto) {
    return this.authService.login(userDto)
  }

}
