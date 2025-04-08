import { dbQuery, dbQueryFirst } from "../services/db";

export interface User {
  id: number;
  email: string;
  password: string;
}

const createUser = async (user: User) => {
  await dbQuery("INSERT INTO Usuario(email, password) VALUES(?,?)", [
    user.email,
    user.password,
  ]);
  let retorno = await dbQuery("SELECT seq FROM sqlite_sequence ");

  return getUser(retorno[0].id)
};

const updateUser = async (user: User) => {
  await dbQuery("UPDATE Usuario SET email = ?, password = ? WHERE id = ?", [
    user.email,
    user.password,
    user.id,
  ]);
  return getUser(user.id);
};

const getUser = async (id: number) => {
  const user = await dbQueryFirst("SELECT * FROM Usuario WHERE id = ?", [id]);
  return user as User | undefined;
};

const getAllUsers = async () => {
  const user = await dbQuery("SELECT * FROM Usuario");
  return user as User[] | undefined;
};

const deleteUser = async (id: number) => {
  await dbQueryFirst("DELETE FROM user_transactions WHERE user_id = ?", [id]);
  await dbQueryFirst("DELETE FROM Usuario WHERE id = ?", [id]);
  return `User with id: ${id} deleted`;
};

const login = async (email: string, password: string) => {
  const user_logged = await dbQueryFirst(
    "SELECT * FROM Usuario WHERE email = ? AND password = ?",
    [email, password]
  );
  return user_logged?.id;
};

export const userModel = {
  createUser,
  updateUser,
  getUser,
  getAllUsers,
  login,
  deleteUser,
};
