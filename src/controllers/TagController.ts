import { Request, Response } from "express";
import { TagService } from "../services/TagService";

class TagController {
  async handle(req: Request, res: Response) {

    const { name } = req.body;

    const createTagService = new TagService();

    const tag = await createTagService.create(name);

    return res.json(tag);
  }

  async listTags(req: Request, res: Response) {
    const listTagService = new TagService();

    const tags = await listTagService.listTags();

    return res.json(tags);
  }
}

export { TagController };