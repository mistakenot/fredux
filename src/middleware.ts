import {Dispatch} from "shared";
import {Request, Response} from 'express';
import * as cors from "cors";

export const createExpressMiddleware = 
    (dispatch: Dispatch) =>
    (req: Request, res: Response): void => {

    if (req.method !== "POST") {
        res.status(403).send("Unsupported http method.");
    }

    cors({origin: true})(req, res, () => {
        res.status(200).send("Testing.");
    });
}