import { getCustomRepository, Repository } from "typeorm";
import { Compliment } from "../entities/Compliment";
import { ComplimentsRepository } from "../repositories/ComplimentsRepository";
import { UsersRepository } from "../repositories/UsersRepository";

interface IComplimentRequest {
  message: string;
  user_sender: string;
  user_receiver: string;
  tag_id: string;
}

class ComplimentService {
  
  private complimentsRepository: Repository<Compliment>;
  
  constructor() {
    this.complimentsRepository = getCustomRepository(ComplimentsRepository);
  }

  async create({message, user_receiver, user_sender, tag_id}: IComplimentRequest) {
    const usersRepository = getCustomRepository(UsersRepository);
    
    if(user_sender === user_receiver)
      throw new Error("Incorrect User Receiver");

    const userReceiverExists = await usersRepository.findOne(user_receiver);
    
    if(!userReceiverExists)
      throw new Error("User Receiver does not exists!");

    const compliment = this.complimentsRepository.create({
      tag_id,
      user_receiver,
      user_sender,
      message
    });

    await this.complimentsRepository.save(compliment);

    return compliment;
  }

  async listSender(user_id: string) {
    const compliments = await this.complimentsRepository.find({
      user_sender: user_id
    });

    return compliments;
  }

  async listReceiver(user_id: string) {
    const compliments = await this.complimentsRepository.find({
      where: {
        user_receiver: user_id
      },
      relations: ["userSender", "userReceiver", "tag"]
    });

    return compliments;
  }
}

export { ComplimentService };