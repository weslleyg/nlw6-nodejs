import { Response, Request, NextFunction } from "express";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

export async function ensureAdmin(req: Request, res: Response, next: NextFunction) {

  const { user_id } = req;
  
  const usersRepository = getCustomRepository(UsersRepository);

  const user = await usersRepository.findOne(user_id);

  if(user?.admin)
    return next();

  return res.status(401).json({
    error: "Unauthorized",
  });

}