import {createReducer, Handler} from "../src/reducers";
import {MockReducerDescriptor} from "./mocks";

describe("Reducer", () => {
    const testHandler: Handler = (reducer, action, uri) => {
        reducer(action, "state");
    }
    
    it("dispatchs an action to a simple handler", () => {
        var mock = new MockReducerDescriptor();
        const dispatch = createReducer(mock)(testHandler);
        const action = {type: "type", userId: "userid"};

        dispatch(action);

        expect(mock.actions[0]).toBeDefined();
        expect(mock.actions[0].type).toEqual("type");
        expect(mock.actions[0].userId).toEqual("userid");
        expect(mock.states[0]).toEqual("state");
    })
})