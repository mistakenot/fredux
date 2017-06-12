import {ReducerDescriptor} from "../src/reducers";
import {Action} from "../src/shared";

export class MockReducerDescriptor implements ReducerDescriptor {
    constructor(
        private events: string[] = [],
        private handle: boolean = true) {

        this.actions = [];
        this.states = []
    }

    public actions: Action[];
    public states: any[];

    createReducer() {
        let actions = this.actions;
        let states = this.states;
        return (action: Action, state: any) => {
            actions.push(action);
            states.push(state);
        }
    }

    canHandle(action: Action): boolean {
        if (this.events.length > 0) {
            return this.events.some(e => action.type === e);
        }
        return this.handle;
    }
}
