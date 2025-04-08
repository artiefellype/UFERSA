import { Application, Router } from "express";
import { userRouter } from "./userRoutes";
import { transactionRouter } from "./transactionRoutes";

export const useRoutes = (app: Application) => {
    const apiRouter = Router()
    apiRouter.use("/user", userRouter)
    apiRouter.use("/transactions", transactionRouter)

    app.use("/api/v1", apiRouter)
}