import { addTransfer, getTransfers, getTransferById, deleteTransfer } from "../service/transferService";
import { CreateTransferDto } from "../dto/transferdto";
import { Request, Response } from "express";

export const addTransferController = async (req: Request, res: Response): Promise<void> => {
    try {
        const CreateTransferDto: CreateTransferDto = req.body;
        const transferCreated = await addTransfer(CreateTransferDto);
        if (transferCreated === "Invalid_email") {
            res.status(400).json({ message: "Invalid email" });
        } else if (transferCreated === "Reciever_not_found") {
            res.status(404).json({ message: "Reciever not found" });
        } else if (transferCreated === "User_not_found") {
            res.status(404).json({ message: "User not found" });
        } else if (transferCreated === "Error") {
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.status(201).json({ message: "Transfer created successfully" });
        }
    } catch (error) {
        console.error('Error creating transfer:', (error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getTransfersController = async (req: Request, res: Response): Promise<void> => {
    try {
        const userId = req.params.userId;
        const transfers = await getTransfers(userId);
        if (transfers === "Error") {
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.status(200).json(transfers);
        }
    } catch (error) {
        console.error('Error getting transfers:', (error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};

export const getTransferByIdController = async (req: Request, res: Response): Promise<void> => {
    try {
        const transferId = req.params.transferId;
        const transfer = await getTransferById(transferId);
        if (transfer === "Error") {
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.status(200).json(transfer);
        }
    } catch (error) {
        console.error('Error getting transfer:', (error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};



export const deleteTransferController = async (req: Request, res: Response): Promise<void> => {
    try {
        const transferId = req.params.transferId;
        const transfer = await deleteTransfer(transferId);
        if (transfer === "Error") {
            res.status(500).json({ message: "Internal server error" });
        } else {
            res.status(200).json({ message: "Transfer deleted successfully" });
        }
    } catch (error) {
        console.error('Error deleting transfer:', (error as Error).message);
        res.status(500).json({ message: "Internal server error" });
    }
};

