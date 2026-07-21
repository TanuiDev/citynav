import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsEmpty, MinLength, IsStrongPassword, IsIn } from "class-validator"

import { UserRole } from "../entities/user.roles"


export class UpdateUserDTO {
  @IsNotEmpty({ message: 'ID is required' })
  id!: number;

  @IsEmail({}, { message: "Enter a valid email address" })
  @IsNotEmpty({ message: "Email address is required" })
  emailAddress?: string;

  @IsNotEmpty({ message: 'Phone number is required' })
  @IsPhoneNumber('KE', { message: 'Phone number must be a valid phone number' })
  phoneNumber?: string;

  @IsNotEmpty({ message: "Enter the userName" })
  @IsString()
  userName?: string;

  @IsEmpty()
  profileImage?: string;

  @IsStrongPassword({},{ message: 'Password must be strong' }) 
  @IsNotEmpty({ message: "Password is required" })
  password?: string;

  @IsNotEmpty({ message: 'Role is required' })
  @IsString({ message: 'Role must be a string' })
  @IsIn([UserRole.USER, UserRole.ADMIN, UserRole.LANDLORD], { message: 'Enter a valid user Role' })
  role?: UserRole;
}
