import {
  Collection,
  CreateOrUpdateRole,
  Index,
} from "./../../../../../adapters/fauna";

export const createLoginFunctionRole = async (client) => {
  console.log("creating login function role");
  const role = await client.query(
    CreateOrUpdateRole({
      name: "functionrole_login",
      privileges: [
        {
          resource: Index("accountByEmail"),
          actions: { read: true },
        },
        {
          resource: Collection("Accounts"),
          actions: { read: true },
        },
      ],
    })
  );
  console.log("created");
  return role;
};
