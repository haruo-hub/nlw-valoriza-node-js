import { Request, Response } from "express";
import { ListTagService } from "../services/ListTagService";

class ListTagsController {

    async handle(request: Request, response: Response) {
        const listTagService =  new ListTagService();
        const compliments = await listTagService.execute();
        return response.json(compliments);
    }
}

export { ListTagsController };
