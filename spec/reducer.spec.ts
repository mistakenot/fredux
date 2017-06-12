import {createReducer, combineReducers, Handler} from "../src/reducers";
import {MockReducerDescriptor} from "./mocks";

describe("combineReducers", () => {
    it("combines singly nested reducers", () => {
        var fooReducer = new MockReducerDescriptor();
        var barReducer = new MockReducerDescriptor();

        var combined = combineReducers({
            foo: fooReducer,
            bar: barReducer
        });

        expect(Object.keys(combined)).toEqual(["foo", "bar"]);
        expect(combined["foo"]).toEqual(fooReducer);
        expect(combined["bar"]).toEqual(barReducer);
    })

    it("combines multi nested reducers", () => {
        var fooReducer = new MockReducerDescriptor();
        var barReducer = new MockReducerDescriptor();
        var gooReducer = new MockReducerDescriptor();

        var combined = combineReducers({
            foo: fooReducer,
            bar: barReducer,
            goo: {
                foo: gooReducer
            }
        });

        expect(Object.keys(combined)).toEqual(["foo", "bar", "goo"]);
        expect(combined["foo"]).toEqual(fooReducer);
        expect(combined["bar"]).toEqual(barReducer);
        expect(combined["goo"]["foo"]).toEqual(gooReducer);
    })
})

describe("createReducer", () => {
    const action = {type: "type", userId: "userid"};
    const testHandler: Handler = (reducer, action, uri) => {
        reducer(action, "state");
        return Promise.resolve({});
    }
    
    it("creates simple reducer", () => {
        var mock = new MockReducerDescriptor();
        var dispatch = createReducer(mock)(testHandler);

        dispatch(action);

        expect(mock.actions[0]).toBeDefined();
        expect(mock.actions[0].type).toEqual("type");
        expect(mock.actions[0].userId).toEqual("userid");
        expect(mock.states[0]).toEqual("state");
    })

    it("creates composite reducer", () => {
        var foo = new MockReducerDescriptor();
        var bar = new MockReducerDescriptor();
        var reducer = combineReducers({
            foo: foo,
            bar: bar
        });
        var dispatch = createReducer(reducer)(testHandler);

        dispatch(action);

        expect(foo.actions[0]).toBeDefined();
        expect(bar.actions[0]).toBeDefined();
    })

    it("creates composite reducer with unhandled", () => {
        var foo = new MockReducerDescriptor();
        var bar = new MockReducerDescriptor(undefined, false);
        var reducer = combineReducers({
            foo: foo,
            bar: bar
        });
        var dispatch = createReducer(reducer)(testHandler);

        dispatch(action);

        expect(foo.actions[0]).toBeDefined();
        expect(bar.actions[0]).toBeUndefined();
    })

    it("creates composite reducer with events filtered", () => {
        var foo = new MockReducerDescriptor([action.type]);
        var bar = new MockReducerDescriptor([], false);
        var reducer = combineReducers({
            foo: foo,
            bar: bar
        });
        var dispatch = createReducer(reducer)(testHandler);

        dispatch(action);

        expect(foo.actions[0]).toBeDefined();
        expect(bar.actions[0]).toBeUndefined();
    })
})