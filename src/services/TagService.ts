import { getCustomRepository, Repository } from 'typeorm';
import { Tag } from '../entities/Tag';
import { TagsRepository } from '../repositories/TagsRepository';
import { classToPlain } from "class-transformer";

class TagService {
  private tagsRepository: Repository<Tag>
  
  constructor() {
    this.tagsRepository = getCustomRepository(TagsRepository)
  }

  async create(name: string) {
    if(!name)
      throw new Error("Name is required!");
    
    const tagAlreadyExists = await this.tagsRepository.findOne({
      name
    });

    if(tagAlreadyExists)
      throw new Error("Name already exists!");

    const tag = this.tagsRepository.create({
      name
    });
    
    await this.tagsRepository.save(tag);

    return tag;
  }

  async listTags() {
    const tags = await this.tagsRepository.find();

    return classToPlain(tags);
  }

}

export { TagService };