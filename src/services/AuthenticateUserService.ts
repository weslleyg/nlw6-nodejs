import { compare } from "bcryptjs";
import { sign } from "jsonwebtoken";
import { getCustomRepository } from "typeorm";
import { UsersRepository } from "../repositories/UsersRepository";

interface IAthenticateRequest {
  email: string;
  password: string;
}

class AuthenticateUserService {
  async execute({ email, password }: IAthenticateRequest) {
    const usersRepository = getCustomRepository(UsersRepository);

    const user = await usersRepository.findOne({
      email
    });

    if(!user) 
      throw new Error("Email doesn't exists!")
    
    const passwordMatch = await compare(password, user.password);

    if(!passwordMatch)
      throw new Error("Password incorrect!");

    const token = sign({
      email: user.email
    }, "3776dc7bdd74c591e514d3039106be70", {
      subject: user.id,
      expiresIn: "1d"
    })

    return token;
  }
}

export { AuthenticateUserService };