import {ReducerDescriptorTree, Action} from "reducers";

export type Dispatch = (action: Action) => void;

export interface Store {
    dispatch: Dispatch
}

export function createStore(reducer: ReducerDescriptorTree): Store {

    return {
        dispatch: (action: Action) => {

        }
    }
}