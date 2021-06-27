import { getCustomRepository, getRepository } from 'typeorm';
import { Compliment } from '../entities/Compliment';
import { ComplimentsRepositories } from '../repositories/ComplimentsRepositories';
import { UsersRepositories } from '../repositories/UsersRepositories';

class DeleteUserByIdService {
    async execute(user_id: string) {
        const usersRepositories = getCustomRepository(UsersRepositories);
        const user = await usersRepositories.findOne(user_id);
        if(user) {
            const complimentsRepositories = getRepository(Compliment);
            let qb = complimentsRepositories.createQueryBuilder("compliments");
            qb.where("user_sender", {user_id});
            qb.orWhere("user_receiver", {user_id});
            const compliments = await qb.getMany();

            const idsToDelete = [];
            compliments.forEach(compliment => {
                idsToDelete.push(compliment.id);
            });

            if(idsToDelete.length > 0) {
                await complimentsRepositories.delete(idsToDelete);
            }
            await usersRepositories.delete(user_id);
        }
    }
}

export { DeleteUserByIdService };

