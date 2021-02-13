import {
  Collection,
  CreateOrUpdateRole,
} from "./../../../../../adapters/fauna";

export const createRegisterFunctionRole = async (client) => {
  console.log("creating register function role");
  const role = await client.query(
    CreateOrUpdateRole({
      name: "functionrole_register",
      privileges: [
        {
          resource: Collection("Accounts"),
          actions: { create: true },
        },
      ],
    })
  );
  console.log("created");
  return role;
};
