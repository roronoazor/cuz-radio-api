import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { Prisma, User } from '@prisma/client';
import { promisify } from 'util';
import * as crypto from 'crypto';

const scrypt = promisify(crypto.scrypt);

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  async create(data: Prisma.UserCreateInput): Promise<User> {
    const salt = crypto.randomBytes(16).toString('hex');
    const derivedKey = (await scrypt(data.password, salt, 64)) as Buffer;
    const hashedPassword = salt + ':' + derivedKey.toString('hex');

    return this.prisma.user.create({
      data: {
        ...data,
        password: hashedPassword,
      },
    });
  }

  async findByUsername(username: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { username } });
  }

  async findByEmail(email: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { email } });
  }

  async findById(id: string): Promise<User | null> {
    return this.prisma.user.findUnique({ where: { id } });
  }

  async verifyPassword(
    storedPassword: string,
    providedPassword: string,
  ): Promise<boolean> {
    const [salt, storedHash] = storedPassword.split(':');
    const derivedKey = (await scrypt(providedPassword, salt, 64)) as Buffer;
    return storedHash === derivedKey.toString('hex');
  }

  async validateEmailisUnique(email: string): Promise<void> {
    const user = await this.findByEmail(email);
    if (user) {
      throw new HttpException(
        'Email has already be taken',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async validateUsernameisUnique(username: string): Promise<void> {
    const user = await this.findByUsername(username);
    if (user) {
      throw new HttpException(
        'Username has already be taken',
        HttpStatus.BAD_REQUEST,
      );
    }
  }

  async findAllUsers(params: {
    skip?: number;
    take?: number;
    cursor?: Prisma.UserWhereUniqueInput;
    where?: Prisma.UserWhereInput;
    orderBy?: Prisma.UserOrderByWithRelationInput;
  }): Promise<User[]> {
    const { skip, take, cursor, where, orderBy } = params;
    return this.prisma.user.findMany({
      skip,
      take,
      cursor,
      where,
      orderBy,
    });
  }

  async validateUserPassword(
    user: User,
    providedPassword: string,
  ): Promise<void> {
    const storedPassword = user.password;
    const isPasswordValid = this.verifyPassword(
      storedPassword,
      providedPassword,
    );

    if (!isPasswordValid) {
      throw new HttpException('Invalid Credentials', HttpStatus.BAD_REQUEST);
    }
  }
}
