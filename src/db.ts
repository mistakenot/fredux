import * as firebase from "firebase"

export const createFirebase = (config: any, baseUrl: string) => {
    var app = firebase.initializeApp(config);
    return app.database().ref(baseUrl);
}

export type Database = firebase.database.Reference;