import versosV1 from "./data.json";
import versosCanarias from "./canarias.json";

export type Version = "v1" | "canarias"

export const INITIAL_VERSES = {
    "v1" : Object.values(versosV1),
    "canarias": Object.values(versosCanarias)
}
