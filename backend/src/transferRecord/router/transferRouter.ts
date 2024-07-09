import {addTransferController, getTransfersController, getTransferByIdController, deleteTransferController} from "../controller/transferController";
import { verifyToken, verifyTokenByHeader } from "../../middleware/authjwt";
import { Router } from "express";

const transfer_router = Router();

transfer_router.post("/addtransfer", verifyToken, addTransferController);
transfer_router.get('/gettransfers/:userId', verifyTokenByHeader, getTransfersController);
transfer_router.get('/gettransferbyid/:transferId', verifyTokenByHeader, getTransferByIdController);
transfer_router.delete('/deletetransfer/:transferId', verifyToken, deleteTransferController);

export default transfer_router;