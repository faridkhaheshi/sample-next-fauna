import {
  CreateOrUpdateRole,
  Collection,
} from "./../../../../../adapters/fauna";

export const createLoggedInUserRole = async (client) => {
  console.log("creating logged-in user role");

  const role = await client.query(
    CreateOrUpdateRole({
      name: "membershiprole_loggedInUser",
      membership: [{ resource: Collection("Accounts") }],
      privileges: [
        {
          resource: Collection("Dinos"),
          actions: { read: true },
        },
      ],
    })
  );

  console.log("created");
  return role;
};
