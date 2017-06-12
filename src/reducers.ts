import {Action} from "shared";

/*
* Redux style reducer function.
*/
export type Reducer = (action: Action, state: any) => any

/* 
* Reducer function with metadata.
*/ 
interface ReducerDescriptor {

    /* 
    * The reducer to act on this part of the application state.
    */
    reducer: Reducer;

    /*
    * Whether this reducer can handle the incoming action.
    * Will decide whether application state will be loaded.
    */
    canHandle: (action: Action) => boolean;
}

/*
* Reducer descriptors organised in a key-value map.
*/
type ReducerDescriptorMap = { [key: string]: ReducerDescriptorTree }

/*
* Either a descriptor map or a single reducer descriptor.
*/
export type ReducerDescriptorTree = ReducerDescriptorMap | ReducerDescriptor

/*
* Event handler used for executing a reducer.
*/
export type Handler = (reducer: Reducer, action: Action, uri: string) => void;

export function combineReducers(reducers: ReducerDescriptorMap): ReducerDescriptorTree {
    if (!isReducerDescriptorMap(reducers)) {
        throw new Error("Argument is not valid reducer collection.");
    }

    const newTree: ReducerDescriptorMap = {};

    Object.keys(reducers).forEach(k => {
        newTree[k] = reducers[k];
    });

    return newTree;
}

const isReducerDescriptorMap = (obj: any): boolean => (
    Object.keys(obj).every(k => typeof k === "string"))

const isReducerDescriptor = (obj: any): boolean => (
    obj["reducer"] && (typeof obj["reducer"] === "function") &&
    obj["canHandle"] && (typeof obj["canHandle"] === "function"));



export const createDispatch = 
    (reducerTree: ReducerDescriptorTree) => 
    (onHandle: Handler) =>
    (action: Action): void => {
    
    function handleDispatchWithUri(reducer: ReducerDescriptorTree, action: Action, uri: string): void {
        if (isReducerDescriptor(reducer)) {
            let descriptor = <ReducerDescriptor> reducer;
            if (descriptor.canHandle(action)) {
                onHandle(descriptor.reducer, action, uri)
            }
        }
        else if (isReducerDescriptorMap(reducer)) {
            let descriptorMap = <ReducerDescriptorMap> reducer;
            Object.keys(reducer).forEach(k => {
                let child = descriptorMap[k]
                handleDispatchWithUri(child, action, uri + "/" + k)
            })
        }
        else {
            throw new Error("Reducer is not valid object.");
        }
    }

    handleDispatchWithUri(reducerTree, action, "/")
}