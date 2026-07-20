import { IsEmail, IsNotEmpty } from 'class-validator';

export class userLoginDTO {
  @IsEmail({},{ message: "emailAddress must be a valid email address" })
  emailAddress!: string;

  @IsNotEmpty({ message: "Password is required" })
  password!: string
}
