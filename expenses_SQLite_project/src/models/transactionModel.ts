import { dbQuery, dbQueryFirst } from "../services/db";

export enum TransactionCategories {
  "ALIMENTATION",
  "CLOTHING",
  "HOUSING",
  "TRANSPORTATION",
  "HEALTH",
  "EDUCATION",
  "ENTERTAINMENT",
  "ELECTRONICS",
  "PERSONAL_CARE",
  "UTILITIES",
  "TRAVEL",
  "GIFTS_AND_DONATIONS",
}
export interface Transaction {
  id: number;
  user_id: number;
  category: TransactionCategories;
  value: number;
  created_at: Date;
}

const createTransaction = async (transaction: Transaction, user_id: number) => {
  await dbQuery(
    "INSERT INTO user_transactions (user_id, category, value, created_at) VALUES (?,?,?,?)",
    [user_id, transaction.category, transaction.value, new Date()]
  );

  return "Transaction created";
};

const getTransactions = async () => {
  const allTransactions = await dbQuery("SELECT * FROM user_transactions");
  return allTransactions as Transaction[];
};

const getTransactionsByUser = async (id: number) => {
  const allTransactionsByUser = await dbQuery(
    "SELECT * FROM user_transactions WHERE user_id = ?",
    [id]
  );
  return allTransactionsByUser as Transaction[];
};

const getTransactionsById = async (id: number) => {
  const allTransactionsByUser = await dbQueryFirst(
    "SELECT * FROM user_transactions WHERE id = ?",
    [id]
  );
  return allTransactionsByUser as Transaction;
};

const updateTransaction = async (transaction: Transaction) => {
  const transaction_updated = await dbQueryFirst(
    "UPDATE user_transactions SET category = ? , value = ? WHERE id = ?",
    [transaction.category, transaction.value, transaction.id]
  );

  return transaction_updated as Transaction;
};

const deleteTransaction = async (id: number) => {
  await dbQuery("DELETE FROM user_transactions WHERE id = ?", [id]);
  return "Transaction deleted";
};

export const transactionModel = {
  createTransaction,
  getTransactions,
  getTransactionsByUser,
  getTransactionsById,
  updateTransaction,
  deleteTransaction,
};
