import { CreateOrUpdateRole, q } from "./../../../../../adapters/fauna";

export const createBootstrapUserRole = async (client) => {
  console.log("creating bootstrap user role");

  const role = await client.query(
    CreateOrUpdateRole({
      name: "keyrole_bootstrapUser",
      privileges: [
        {
          resource: q.Function("login"),
          actions: { call: true },
        },
        {
          resource: q.Function("register"),
          actions: { call: true },
        },
      ],
    })
  );

  console.log("created");
  return role;
};
