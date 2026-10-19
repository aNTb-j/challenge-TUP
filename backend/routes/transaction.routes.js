import { Router } from "express"; 

import { getAllTransactionData, creatTransaction } from "../service/transaction.service.js";

const router = Router();

router.get("/transactions", getAllTransactionData)

router.post("/transactions", creatTransaction)

export default router;