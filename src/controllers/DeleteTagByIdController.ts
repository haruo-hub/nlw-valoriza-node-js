import { Request, Response } from "express";
import { DeleteTagByIdService } from "../services/DeleteTagByIdService";
import { ListTagService } from "../services/ListTagService";

class DeleteTagByIdController {

    async handle(request: Request, response: Response) {
        const { tag_id } = request.params;
        const deleteTagByIdService =  new DeleteTagByIdService();
        await deleteTagByIdService.execute(tag_id);
        return response.status(200).end();
    }
}

export { DeleteTagByIdController };
