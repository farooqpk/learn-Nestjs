import {
  ForbiddenException,
  Injectable,
} from '@nestjs/common';
import { UserDto } from '../dto';
import * as bcrypt from 'bcrypt';
import { PrismaService } from '../../prisma/services/prisma.service';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';
import { JwtService } from '@nestjs/jwt';
import { ConfigService } from '@nestjs/config';

@Injectable()
export class AuthService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly jwt: JwtService,
    private readonly config: ConfigService,
  ) {}

  async login(userDto: UserDto) {
    try {
      const user =
        await this.prisma.user.findUnique({
          where: { email: userDto.email },
        });
      if (!user) {
        throw new ForbiddenException(
          'user doesnt exist',
        );
      } else {
        const isPassMatch = await bcrypt.compare(
          userDto.password,
          user.password,
        );

        if (isPassMatch) {
          return this.signToken(
            user.id,
            user.email,
          );
        } else {
          throw new ForbiddenException(
            'password is incorrct',
          );
        }
      }
    } catch (error) {
      throw error;
    }
  }

  async signup(userDto: UserDto) {
    try {
      const pass: string = await bcrypt.hash(
        userDto.password,
        10,
      );
      const user = await this.prisma.user.create({
        data: {
          email: userDto.email,
          password: pass,
          name: userDto.name,
        },
      });
      return this.signToken(user.id, user.email);
    } catch (error) {
      if (
        error instanceof
        PrismaClientKnownRequestError
      ) {
        // duplicate
        if (error.code === 'P2002') {
          // we dont need to return but handled by nestjs with 403 forbidden status code
          throw new ForbiddenException(
            'already existed',
          );
        }
      } else {
        throw error;
      }
    }
  }

  async signToken(
    userId: string,
    email: string,
  ): Promise<{ access_token: string }> {
    const payload = {
      userId,
      email,
    };
    const token = await this.jwt.signAsync(
      payload,
      {
        secret: this.config.get('JWT_SECRET'),
        expiresIn: '15m',
      },
    );

    return {
      access_token: token,
    };
  }
}
