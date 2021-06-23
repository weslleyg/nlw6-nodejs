import { getCustomRepository, Repository } from 'typeorm';
import { Tag } from '../entities/Tag';
import { TagsRepository } from '../repositories/TagsRepository';

class CreateTagService {
  private tagsRepository: Repository<Tag>
  
  constructor() {
    this.tagsRepository = getCustomRepository(TagsRepository)
  }

  async execute(name: string) {
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
}

export { CreateTagService };