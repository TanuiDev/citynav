import { IsEmail, IsNotEmpty, IsString, IsPhoneNumber, IsEmpty, minLength,IsStrongPassword, isStrongPassword, IsIn } from "class-validator"

import { UserRole } from "../entities/user.roles"


export class RegisterUserDTO{
    @IsEmail("Enter a valid email address")
    @IsNotEmpty("Email address required")
    emailAddress!:string

    @IsNotEmpty({ message: 'Phone number is required' })
    @IsPhoneNumber('KE', { message: 'Phone number must be a valid phone number' })
    phoneNumber!:string

    @IsNotEmpty("Enter the userName")
    @IsString()
    userName!: string

    @IsEmpty()
    profileImage!:string

    @isStrongPassword()
    @IsNotEmpty("Password is required")
    password!:string

    @IsNotEmpty({ message: 'Role is required' })
    @IsString({ message: 'Role must be a string' })
    @IsIn([UserRole.USER, UserRole.ADMIN, UserRole.LANDLORD], { message: 'Enter a valid user Role' })
    role!: UserRole;

}


