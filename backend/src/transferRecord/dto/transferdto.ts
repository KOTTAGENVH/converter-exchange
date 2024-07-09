import { IsEmail, IsString, IsNumber } from 'class-validator';

export class CreateTransferDto {
    @IsString()
    receiver: String;

    @IsEmail()
    receiveremail: string;

    @IsNumber()
    amount: number;

    @IsNumber()
    amountfrom: number;

    @IsString()
    currency: String;

    @IsString()
    currencyfrom: String;

    @IsString()
    note: String;

    @IsString()
    userId: String;

    constructor(receiver: String, receiveremail: string, amount: number, currency: String, note: String, userId: String) {
        this.receiver = receiver;
        this.receiveremail = receiveremail;
        this.amount = amount;
        this.currency = currency;
        this.note = note;
        this.userId = userId;
    }
}
