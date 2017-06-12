export interface Action {
    type: string;
    userId: string;
}

export type Dispatch = (action: Action) => void;