import { Router } from "express";
import { transactionController } from "../controllers/transactionController";

const transactionRouter = Router()

transactionRouter.post("/", transactionController.insertTransaction)
transactionRouter.get("/", transactionController.getAllTransactions)
transactionRouter.get("/:id", transactionController.getAllTransactionsByUser)
transactionRouter.put("/:id", transactionController.updateTransaction)
transactionRouter.delete("/:id", transactionController.deleteTransaction)

export {
    transactionRouter
}