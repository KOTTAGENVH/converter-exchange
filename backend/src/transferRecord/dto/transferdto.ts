import { IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateTransferDto {
    @IsString()
    reciever: String;

    @IsEmail()
    receiveremail: string;

    @IsNumber()
    amount?: number;

    @IsString()
    currency: String;

    @IsString()
    note: String;

    @IsString()
    userId: String;

    constructor(reciever: String, receiveremail: string, amount: number, currency: String, note: String, userId: String) {
        this.reciever = reciever;
        this.receiveremail = receiveremail;
        this.amount = amount;
        this.currency = currency;
        this.note = note;
        this.userId = userId;
    }
}
