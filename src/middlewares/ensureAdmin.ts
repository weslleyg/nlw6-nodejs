import { Response, Request, NextFunction } from "express";

export function ensureAdmin(req: Request, res: Response, next: NextFunction) {

  const { user_id } = req;
  console.log(user_id);

  const admin = true;

  if(admin)
    return next();

  return res.status(401).json({
    error: "Unauthorized",
  });
}