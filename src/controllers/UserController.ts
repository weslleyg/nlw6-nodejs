import { Request, Response } from "express";
import { UserService } from "../services/UserService";

class UserController {
  async handle(req: Request, res: Response) {
    
      const { name, email, admin, password } = req.body;

      const createUserService = new UserService();

      const user = await createUserService.create({ name, email, admin, password });

      return res.json(user);

  }

  async listUsers(req: Request, res: Response) {
    
    const listUsersService = new UserService();

    const users = await listUsersService.listUsers();

    return res.json(users);

  }
}

export { UserController };