import * as functions from "firebase-functions";
import * as cors from "cors";

export const createGoogleFunction = () => {
    return functions.https.onRequest((req, res) => {
        // if (req.method != "POST") {
        //     res.status(403).send("Method not allowed.");
        // }

        cors({origin: true})(req, res, () => {
            res.status(200).send("testing");
        });
    })
}