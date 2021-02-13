import { query as q } from "faunadb";

const { Exists, If, Delete } = q;

export default (ref) => If(Exists(ref), Delete(ref), false);
