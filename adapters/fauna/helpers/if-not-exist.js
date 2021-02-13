import { query as q } from "faunadb";

const { Exists, If, Lambda, Let, Get, Var } = q;

export default (ref, fqlCode) => If(Exists(ref), false, fqlCode);
