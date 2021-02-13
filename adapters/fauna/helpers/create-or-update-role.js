import { query as q } from "faunadb";

const { Exists, If, Update, CreateRole, Role } = q;

export default (obj) =>
  If(
    Exists(Role(obj.name)),
    Update(Role(obj.name), {
      membership: obj.membership,
      privileges: obj.privileges,
    }),
    CreateRole(obj)
  );
