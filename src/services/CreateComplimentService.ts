import { getCustomRepository } from "typeorm";
import { UsersRepositories } from "../repositories/UsersRepositories";
import { hash } from "bcryptjs";
import { ComplimentsRepositories } from "../repositories/ComplimentsRepositories";

interface ICreateComplimentService {
    user_sender: string;
    user_receiver: string;
    tag_id: string;
    message: string;
}

class CreateComplimentService {
    async execute({ user_sender, user_receiver, tag_id, message } : ICreateComplimentService) {
        const complimentsRepositories = getCustomRepository(ComplimentsRepositories);
        const usersRepositories = getCustomRepository(UsersRepositories);

        if(user_sender === user_receiver) {
            throw new Error("Incorrect user receiver!");
        }

        const userReceiverExists = await usersRepositories.findOne(user_receiver);
        if(!userReceiverExists) {
            throw new Error("User receiver does not exists!");
        }

        const compliment = complimentsRepositories.create({
            user_sender,
            user_receiver,
            tag_id,
            message
        });

        await complimentsRepositories.save(compliment);

        return compliment;
    }
}

export { CreateComplimentService };