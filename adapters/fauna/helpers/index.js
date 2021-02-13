import { query as q } from "faunadb";

const {
  Do,
  Create,
  Documents,
  CreateCollection,
  CreateIndex,
  Collection,
  Exists,
  Get,
  If,
  Index,
  Delete,
  Lambda,
  Let,
  Login,
  Match,
  Now,
  Paginate,
  Var,
  Query,
  Role,
  Select,
  TimeAdd,
} = q;

export { default as IfNotExist } from "./if-not-exist";
export { default as DeleteIfExists } from "./delete-if-exists";
export { default as CreateOrUpdateRole } from "./create-or-update-role";
export { default as CreateOrUpdateFunction } from "./create-or-update-function";

export {
  Do,
  Create,
  Documents,
  CreateCollection,
  CreateIndex,
  Collection,
  Exists,
  Get,
  If,
  Index,
  Delete,
  Lambda,
  Let,
  Login,
  Match,
  Now,
  Paginate,
  Var,
  q,
  Query,
  Role,
  Select,
  TimeAdd,
};
