import mongoose from 'mongoose';

const Schema = mongoose.Schema;

const transferSchema = new Schema({

    transferId: {
        type: String,
        required: true,
        unique: true
    },
    date: {
        type: Date,
        required: true
    },
    sender: {
        type: String,
        required: true
    },
    senderemail: {
        type: String,
        required: true
    },
    receiver: {
        type: String,
        required: true
    },
    receiveremail: {
        type: String,
        required: true
    },
    amount: {
        type: Number,
        required: true
    },
    currency: {
        type: String,
        default: 'USD'
    },
    note: {
        type: String
    },
    userId: {
        type: String,
        required: true
    }
});

const Transfer = mongoose.model("Transfer", transferSchema);

export default Transfer;
