import { Request, Response } from "express";
import { ComplimentService } from "../services/ComplimetService";

class ComplimentController {
  
  async handle(req: Request, res: Response) {
    
    const { tag_id, user_receiver, message } = req.body;
    const { user_id } = req;

    const createComplimentService = new ComplimentService();

    const compliment = await createComplimentService.create({
      tag_id,
      user_sender: user_id,
      user_receiver,
      message
    });

    return res.json(compliment);
  }

  async listSender(req: Request, res: Response) {

    const { user_id } = req;

    const listSenderComplimentService = new ComplimentService();

    const compliments = await listSenderComplimentService.listSender(user_id);

    return res.json(compliments);
  }

  async listReceiver(req: Request, res: Response) {
    
    const { user_id } = req;

    const listReceiverComplimentService = new ComplimentService();
    
    const compliments = await listReceiverComplimentService.listReceiver(user_id);
    
    return res.json(compliments);
  }

}

export { ComplimentController };