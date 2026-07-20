import { isEmail, IsNotEmpty } from "class-validator";

export class userLoginDTO{
    @isEmail()
    emailAddress!:string

    @IsNotEmpty()
    password!:string
}