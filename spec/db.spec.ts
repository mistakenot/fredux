import {create} from "./db";
import {Database} from "../src/db";
import {rnd} from "./utils";

describe("Firebase ", () => {
    var uri: string;
    var data: any;
    var db: Database;

    beforeAll(() => {
        db = create()
        let random = rnd();
        uri = random;
        data = {data: random};
    })

    it("sets data", done => {
        db.child(uri).set(data, e => {
            expect(e).toBeNull();
            done();
        }).catch(fail);
    })

    it("reads data", done => {
        db.child(uri).once("value").then(snapshot => {
            expect(snapshot.val()).toEqual(data);
            done();
        })
    })

    it("deletes data", done => {
        db.child(uri).set({}, e => {
            expect(e).toBeNull();
            done();
        })
    })
})