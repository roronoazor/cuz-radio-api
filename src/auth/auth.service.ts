import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { UsersService } from '../users/users.service';
import { SignupDto, LoginDto } from './dto';
import { User } from '@prisma/client';

@Injectable()
export class AuthService {
  constructor(
    private usersService: UsersService,
    private jwtService: JwtService,
  ) {}

  async login(loginDto: LoginDto) {
    const user = await this.usersService.findByEmail(loginDto.email);
    if (!user) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }

    // validate user password, if not valid raise error
    await this.usersService.validateUserPassword(user, loginDto.password);

    const { password, ...userWithoutPassword } = user;
    const payload = await this.generateUserJWTPayload(userWithoutPassword);
    return payload;
  }

  async generateUserJWTPayload(user: Partial<User>) {
    const payload = { ...user };
    return {
      ...user,
      access_token: this.jwtService.sign(payload),
    };
  }

  async signup(signupDto: SignupDto): Promise<Omit<User, 'password'>> {
    const { username, email, password, userRole } = signupDto;

    // Validate email and username, if taken raise error
    await this.usersService.validateEmailisUnique(email);
    await this.usersService.validateUsernameisUnique(username);

    // Create new user
    try {
      const newUser = await this.usersService.create({
        username,
        email,
        password,
        role: userRole,
      });

      // Remove password from the response
      const { password: _, ...userWithoutPassword } = newUser;
      const userPayload: any =
        await this.generateUserJWTPayload(userWithoutPassword);
      return userPayload;
    } catch (error) {
      throw new HttpException(
        'Error creating user',
        HttpStatus.INTERNAL_SERVER_ERROR,
      );
    }
  }

  async validateUser(username: string, password: string): Promise<any> {
    const user = await this.usersService.findByUsername(username);
    if (
      user &&
      (await this.usersService.verifyPassword(user.password, password))
    ) {
      const { password, ...result } = user;
      return result;
    }
    return null;
  }
}
