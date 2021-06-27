import { Request, Response } from "express";
import { DeleteTagByIdService } from "../services/DeleteTagByIdService";
import { DeleteUserByIdService } from "../services/DeleteUserByIdService";
import { ListTagService } from "../services/ListTagService";

class DeleteUserByIdController {

    async handle(request: Request, response: Response) {
        const { user_id } = request.params;
        const deleteUserByIdService =  new DeleteUserByIdService();
        await deleteUserByIdService.execute(user_id);
        return response.status(200).end();
    }
}

export { DeleteUserByIdController };
