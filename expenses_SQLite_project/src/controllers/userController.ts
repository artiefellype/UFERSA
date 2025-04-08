import { Request, Response } from "express";
import {
  badRequest,
  internalServerError,
  notFound,
  ok,
  validateNumber,
} from "../services/util";
import { User, userModel } from "../models/userModel";

const insertUser = (req: Request, res: Response) => {
  {
    const user = req.body;

    if (!user) return badRequest(res, "Usuario inválido");
    if (!user.email)
      return badRequest(res, "Usuario inválido: Informe o seu email");
    if (!user.password)
      return badRequest(res, "Usuario inválido: Informe a sua senha");
  }

  const user = req.body as User;
  userModel
    .createUser(user)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => internalServerError(res, err));
};

const updateUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return badRequest(res, "Id de usuário inválido");

    const user = req.body;
    if (!user) return badRequest(res, "Usuario inválido");
    if (!user.email)
      return badRequest(res, "Usuario inválido: Informe o seu email");
    if (!user.password)
      return badRequest(res, "Usuario inválido: Informe a sua senha");

    const user_in_db = await userModel.getUser(id);
    if (!user_in_db) return notFound(res);
  }

  const user = req.body as User;
  userModel
    .updateUser(user)
    .then((user) => {
      res.json(user);
    })
    .catch((err) => internalServerError(res, err));
};

const getUser = (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return badRequest(res, "Id de usuário inválido");
  }

  userModel
    .getUser(id)
    .then((user) => {
      if (user) return res.json(user);
      else return notFound(res);
    })
    .catch((err) => internalServerError(res, err));
};

const getAllUsers = (req: Request, res: Response) => {

  userModel
    .getAllUsers()
    .then((user) => {
      if (user) return res.json(user);
      else return notFound(res);
    })
    .catch((err) => internalServerError(res, err));
};

const deleteUser = async (req: Request, res: Response) => {
  const id = parseInt(req.params.id);
  {
    if (!validateNumber(id)) return badRequest(res, "Id de usuário inválido");
    const user_in_db = await userModel.getUser(id);
    if (!user_in_db) return notFound(res);
  }

  userModel
    .deleteUser(id)
    .then(() => ok(res))
    .catch((err) => internalServerError(res, err));
};

const login = async (req: Request, res: Response) => {
  {
    const user = req.body;

    if (!user) return badRequest(res, "Usuario inválido");
    if (!user.email)
      return badRequest(res, "Usuario inválido: Informe o seu email");
    if (!user.password)
      return badRequest(res, "Usuario inválido: Informe a sua senha");

  }

  const user = req.body as User;
  userModel
    .login(user.email, user.password)
    .then((user) => {
      return res.json({ 
        userID: user
      });
    })
    .catch((err) => internalServerError(res, err));
}

export const userController = {
  insertUser,
  updateUser,
  getUser,
  getAllUsers,
  deleteUser,
  login,
};
