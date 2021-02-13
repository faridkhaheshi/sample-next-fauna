import {
  CreateOrUpdateFunction,
  Query,
  Lambda,
  Role,
  Var,
  Create,
  Collection,
} from "./../../../../../adapters/fauna";

export const createRegisterFunction = async (client) => {
  console.log("creating register user-defined function");

  const udf = await client.query(
    CreateOrUpdateFunction({
      name: "register",
      body: Query(
        Lambda(
          ["email", "password"],
          Create(Collection("Accounts"), {
            credentials: { password: Var("password") },
            data: {
              email: Var("email"),
            },
          })
        )
      ),
      role: Role("functionrole_register"),
    })
  );

  console.log("created");
  return udf;
};
