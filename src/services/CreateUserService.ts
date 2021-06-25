import { hash } from 'bcryptjs';
import { getCustomRepository, Repository } from 'typeorm';
import { User } from '../entities/User';
import { UsersRepository } from '../repositories/UsersRepository';

interface IUserRequest {
  name: string;
  email: string;
  admin: boolean;
  password: string;
}

class CreateUserService {

  private usersRepository: Repository<User>;

  constructor() {
    this.usersRepository = getCustomRepository(UsersRepository);
  }

  async execute({ name, email, admin = false, password }: IUserRequest ) {
    
    if(!email)
      throw new Error("Email incorrect.");

    const userAlreadyExists = await this.usersRepository.findOne({
      email
    });

    if(userAlreadyExists)
      throw new Error("User already exists.");
    
    const passwordHash = await hash(password, 8);

    const user = this.usersRepository.create({
      name,
      email,
      admin,
      password: passwordHash
    });

      await this.usersRepository.save(user);

      return user;
  }
}

export { CreateUserService };