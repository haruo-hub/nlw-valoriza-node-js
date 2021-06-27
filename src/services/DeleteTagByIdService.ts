import { getCustomRepository } from 'typeorm';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { TagsRepositories } from '../repositories/TagsRepositories';

class DeleteTagByIdService {
    async execute(tag_id: string) {
        const tagsRepositories = getCustomRepository(TagsRepositories);
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const compliments = await complimentsRepositories.find({where: {
            tag_id
        }});
        const idsToDelete = [];
        compliments.forEach(compliment => {
            idsToDelete.push(compliment.id);
        });
        
        await complimentsRepositories.delete(idsToDelete);
        await tagsRepositories.delete(tag_id);
    }
}

export { DeleteTagByIdService };

