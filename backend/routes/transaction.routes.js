import { Router } from "express"; 

import { getTransactionData, creatTransaction } from "../service/transaction.service.js";

const router = Router();

router.get("/transactions", getTransactionData)

router.post("/transactions", creatTransaction)

export default router;