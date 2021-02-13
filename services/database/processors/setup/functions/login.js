import {
  Get,
  Index,
  CreateOrUpdateFunction,
  Query,
  Lambda,
  Role,
  Let,
  Login,
  Match,
  Now,
  Select,
  TimeAdd,
  Var,
} from "./../../../../../adapters/fauna";

export const createLoginFunction = async (client) => {
  console.log("creating login user-defined function");
  const udf = await client.query(
    CreateOrUpdateFunction({
      name: "login",
      body: Query(
        Lambda(
          ["email", "password"],
          Let(
            {
              accountRef: Match(Index("accountByEmail"), Var("email")),
              token: Login(Var("accountRef"), {
                password: Var("password"),
                ttl: TimeAdd(Now(), 3, "hour"),
              }),
              account: Get(Var("accountRef")),
            },
            {
              account: Var("account"),
              secret: Select(["secret"], Var("token")),
            }
          )
        )
      ),
      role: Role("functionrole_login"),
    })
  );

  console.log("created");
  return udf;
};
