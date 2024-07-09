import Transfer from "../model/transfer";
import User from "../../user/model/user";
import { CreateTransferDto } from "../dto/transferdto";
import { customEmail } from "../../nodemailer/customEmail";
import validator from 'validator';

//Func to generate random transfer id
const generateUniqueCode = async (): Promise<string> => {
    let code: string;
    var existingtransferid: any = "";
    let exists = true;
    while (exists) {
        code = Math.floor(1000 + Math.random() * 9000).toString(); // Generate a 4-digit number
        existingtransferid = await Transfer.exists({ transferId: code });
        if (!existingtransferid) {
            exists = false;
        } else {
            exists = true;
        }
    }
    return code;
};

//add transfer record
export const addTransfer = async (transfer: CreateTransferDto) => {

    console.log("transfer", transfer)
    // Validate receiver email
    if (!validator.isEmail(transfer.receiveremail)) {
        return "Invalid_email";
    }

    //Check if reciever exists
    const exsistingreciever = await User.findOne({ email: transfer.receiveremail });

    if (!exsistingreciever) return "Reciever_not_found";

    const exsistinguser = await User.findOne({ _id: transfer.userId });

    if (!exsistinguser) return "User_not_found";

    //call function to generate unique transfer id
    const uniqueTransferId = await generateUniqueCode();

    const newTransfer = new Transfer({
        transferId: uniqueTransferId,
        date: Date.now(),
        sender: exsistinguser.firstName + " " + exsistinguser.lastName,
        senderemail: exsistinguser.email,
        receiver: transfer.receiver,
        receiveremail: transfer.receiveremail,
        amount: transfer.amount,
        amountfrom: transfer.amountfrom,
        currency: transfer.currency,
        currencyfrom: transfer.currencyfrom,
        note: transfer.note,
        userId: exsistinguser._id
    });
    try {
        await customEmail(exsistinguser.email, "Transfer Completed!", " You have successfully transferred " + uniqueTransferId + "" + transfer.amount + " " + transfer.currency + " to " + transfer.receiver + "!");
        await customEmail(transfer.receiveremail, "Transfer Completed!", " You have successfully transferred " + uniqueTransferId + "" + transfer.amount + " " + transfer.currency + " to " + transfer.receiver + "!");
        await newTransfer.save();
    } catch (error) {
        console.error('Error adding transfer:', (error as Error).message);
        return "Error";
    }
}

//get all transfers by user
export const getTransfers = async (userId: string) => {
    try {
        const transfers = await Transfer.find({ userId });
        return transfers;
    } catch (error) {
        console.error('Error getting transfers:', (error as Error).message);
        return "Error";
    }
}

//get transfer by transfer id
export const getTransferById = async (transferId: string) => {
    try {
        const transfer = await Transfer.findOne({ transferId: transferId });
        return transfer;
    } catch (error) {
        console.error('Error getting transfer:', (error as Error).message);
        return "Error";
    }
}

//delete transfer by transfer id
export const deleteTransfer = async (transferId: string) => {
    try {
        console.log("transferId", transferId)
        const result = await Transfer.deleteOne({ transferId: transferId });
        console.log(`Deleted ${result.deletedCount} transfer(s)`);
        return "Deleted";
    } catch (error) {
        console.error('Error deleting transfer:', (error as Error).message);
        return "Error";
    }
}