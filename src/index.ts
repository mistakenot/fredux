import {Dispatch} from "shared";
import {ReducerDescriptorTree, createDispatch} from "reducers";
import {createHandler} from "db";

export function createApp(reducer: ReducerDescriptorTree): Dispatch {
    let handler = createHandler({});
    return createDispatch(reducer)(handler);
}

