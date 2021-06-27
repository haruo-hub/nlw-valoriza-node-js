import "reflect-metadata";
import express, { Request, Response, NextFunction } from "express";
import "express-async-errors";
import "./database";
import { router } from "./routes";

const app = express();

app.use(express.json());

app.use(router);

app.use((err: Error, request: Request, response: Response, next: NextFunction) => {
    if(err instanceof Error) {
        response.status(400).json({error: err.message});
        next(err);
    }

    response.status(500).json({error: "Internal Server Error"});
    next(err);
});

app.listen(3000, () => console.log("Server is running"));

