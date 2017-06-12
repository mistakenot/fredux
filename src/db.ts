import {Action} from "shared";
import {Reducer, Handler} from "reducers";
import * as firebase from "firebase/app";

export const createHandler = 
    (firebaseConfig: any): Handler =>  {
        let app = firebase.initializeApp(firebaseConfig);
        let db = app.database();

        return (reducer: Reducer, action: Action, uri: string) => {
            db.ref(uri).once("value").then(state => {
                let newState = reducer(action, state);
                db.ref(uri).set(newState);
            })
        }
    }