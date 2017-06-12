import config from "./dev-db-config.secret";
import {createFirebase, Database} from "../src/db";

var instance: Database

export const create = () => {
    if (!instance) {
        instance = createFirebase(config, "_testing");
    }

    return instance;
}