import { Request, Response } from "express";
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
  validateNumber,
} from "../services/util";
import { Transaction, transactionModel } from "../models/transactionModel";

const insertTransaction = (req: Request, res: Response) => {
  {
    const transaction = req.body;

    if (!transaction) return badRequest(res, "Transação inválido");
    if (!transaction.user_id)
      return badRequest(
        res,
        "Transação inválida: Usuário não pode ser indefinido"
      );
    if (!transaction.category)
      return badRequest(res, "Transação inválida: Informe uma categoria");
    if (!transaction.value)
      return badRequest(res, "Transação inválida: Informe um valor válido");
  }

  const transaction = req.body as Transaction;
  const user = req.body.user_id;
  transactionModel
    .createTransaction(transaction, user)
    .then((id) => {
      res.json({
        id: id,
      });
    })
    .catch((err) => internalServerError(res, err));
};

const getAllTransactions = (req: Request, res: Response) => {
  transactionModel
    .getTransactions()
    .then((transactions) => {
      res.json(transactions)
    })
    .catch((err) => {
        internalServerError(res, err)
    });
};

const getAllTransactionsByUser = (req: Request, res: Response) => {
  if (!req.params.id) return badRequest(res, "Informe o Id do usuário");

  const id = parseInt(req.params.id);
  if (!validateNumber(id)) return badRequest(res, "Id de usuário inválido");

  transactionModel
    .getTransactionsByUser(id)
    .then((transactions) => {
      res.json(transactions);
    })
    .catch((err) => internalServerError(res, err));
};

const deleteTransaction = async (req: Request, res: Response) => {
  if (!req.params.id) return badRequest(res, "Informe o Id da transação");

  const id = parseInt(req.params.id);
  if (!validateNumber(id)) return badRequest(res, "Id de transação inválido");

  const transaction_in_db = await transactionModel.getTransactionsById(id);
  if (!transaction_in_db) return notFound(res);

  transactionModel
    .deleteTransaction(id)
    .then(() => ok(res))
    .catch((err) => internalServerError(res, err));
};

const updateTransaction = async (req: Request, res: Response) => {

    const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return badRequest(res, "Id de usuário inválido");

    const transaction = req.body;
    if (!transaction) return badRequest(res, "Usuario inválido");
    if (!transaction.category)
      return badRequest(res, "Transação inválida: Informe a nova categoria");
    if (!transaction.value)
      return badRequest(res, "Transação inválida: Informe o novo valor");

    const transactionInDb = await transactionModel.getTransactionsById(id);
    if (!transactionInDb) return notFound(res);
  }
    
      const transaction = req.body as Transaction;
      transactionModel
        .updateTransaction(transaction)
        .then((transaction) => {
          res.json(transaction);
        })
        .catch((err) => internalServerError(res, err));

}
export const transactionController = {
  insertTransaction,
  getAllTransactions,
  getAllTransactionsByUser,
  deleteTransaction,
  updateTransaction
};
