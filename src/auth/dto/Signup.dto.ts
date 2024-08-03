import {
  IsNotEmpty,
  IsEmail,
  IsString,
  MinLength,
  Matches,
  IsIn,
} from 'class-validator';
import { UserRole, UserRoleType } from 'src/constants/user-roles';

export class SignupDto {
  @IsNotEmpty({ message: 'Username is required' })
  @IsString({ message: 'Username must be a string' })
  @MinLength(3, { message: 'Username must be at least 3 characters long' })
  username: string;

  @IsNotEmpty({ message: 'Email is required' })
  @IsEmail({}, { message: 'Invalid email format' })
  email: string;

  @IsNotEmpty({ message: 'Password is required' })
  @IsString({ message: 'Password must be a string' })
  @MinLength(8, { message: 'Password must be at least 8 characters long' })
  @Matches(/((?=.*\d)|(?=.*\W+))(?![.\n])(?=.*[A-Z])(?=.*[a-z]).*$/, {
    message: 'Password is too weak',
  })
  password: string;

  @IsNotEmpty({ message: 'User role is required' })
  @IsString({ message: 'User role must be a string' })
  @IsIn(Object.values(UserRole), { message: 'Invalid user role' })
  userRole: UserRoleType;
}
