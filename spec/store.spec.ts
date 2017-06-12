import {createFirebaseStore} from "../src/store";
import {Reducer, Handler} from "../src/reducers";
import {create} from "./db";
import {Database} from "../src/db";
import {rnd} from "./utils";

describe("Store", () => {
    var db: Database;
    var val: string;
    var store: Handler;
    var reducer: Reducer;
    var uri: string;

    beforeAll(done => {
        db = create();
        val = rnd();
        store = createFirebaseStore(db);
        uri = "/store-spec";
        reducer = (action, state) => {
            let s =  state.toString() + " " + val;
            return s;
        }
        db.child(uri).set("1").then(done);
    })

    it("sets a value from reducer", done => {
        store(reducer, {type: "any", userId: ""}, uri).then(s => {
            db.child(uri).once("value").then(snapshot => {
                expect(snapshot.val()).toEqual("1 " + val);
                done();
            }).catch(e => {
                fail(e);
            })
        });
    })
})