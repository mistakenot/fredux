import {Request, Response} from "express";
import {createReducer, ReducerDescriptorTree} from "reducers";
import {createFirebase} from "db";
import {createFirebaseStore} from "store";
import {createExpressMiddleware} from "middleware";

export function createMiddleware(
    reducerDescriptor: ReducerDescriptorTree,
    firebaseConfig: any) : (req: Request, res: Response) => void {
    
    let db = createFirebase(firebaseConfig, "/");
    let store = createFirebaseStore(db);
    let handler = createReducer(reducerDescriptor)(store);
    let middleware = createExpressMiddleware(handler);

    return middleware;
}