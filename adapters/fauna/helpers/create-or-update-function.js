import { query as q } from "faunadb";

const { Exists, If, Update, CreateFunction } = q;

export default (obj) =>
  If(
    Exists(q.Function(obj.name)),
    Update(q.Function(obj.name), { body: obj.body, role: obj.role }),
    CreateFunction({ name: obj.name, body: obj.body, role: obj.role })
  );
