import {Action} from "shared";
import {Reducer, Handler} from "reducers";
import * as firebase from "firebase";
import {Database} from "db";

export const createFirebase = (config: any) => {
    var app = firebase.initializeApp(config);
    return app.database();
}

export const createFirebaseStore = 
    (db: Database): Handler =>  {
        return (reducer: Reducer, action: Action, uri: string) => {
            return new Promise((resolve, reject) => {
                db.child(uri).once("value").then(snapshot => {
                    let newState = reducer(action, snapshot.val());

                    db.child(uri).set(newState).then(() => {
                        db.child(uri).once("value").then(s => {
                            resolve(s.val())
                        })

                    })
                    .catch(reject);
                })
            })    
        }
    }