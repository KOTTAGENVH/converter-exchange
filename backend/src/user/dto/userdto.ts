import { IsEmail, IsString, Length } from 'class-validator';

export class CreateUserDto {
    @IsString()
    @Length(2, 30)
    firstName: string;

    @IsString()
    @Length(2, 30)
    lastName: string;

    @IsEmail()
    email: string;

    @IsString()
    @Length(8, 100)
    password: string;

    constructor(firstName: string, lastName: string, email: string, password: string) {
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
    }
}
