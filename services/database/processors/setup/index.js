import faunadb, { query as q } from "faunadb";
import {
  createAccountsCollection,
  createDinosCollection,
  deleteAccountsCollection,
  deleteAllAccounts,
  deleteAllDinos,
  populateAccounts,
  populateDinos,
} from "./collections";
import { createAccountByEmailIndex, createAllAccountsIndex } from "./indexes";
import {
  createBootstrapUserRole,
  createLoggedInUserRole,
  createLoginFunctionRole,
  createRegisterFunctionRole,
} from "./roles";
import { createLoginFunction, createRegisterFunction } from "./functions";

export const setUpDatabase = async (secret) => {
  console.log("setting up database...");
  const client = new faunadb.Client({ secret });

  console.log("\n");
  console.log("-------------");
  console.log("-------------");
  console.log(`Creating Collections:`);

  const accountsResult = await createAccountsCollection(client);
  const dinosResult = await createDinosCollection(client);

  console.log("\n");
  console.log("-------------");
  console.log("-------------");
  console.log(`Creating Indexes:`);
  await createAllAccountsIndex(client);
  await createAccountByEmailIndex(client);

  console.log("\n");
  console.log("-------------");
  console.log("-------------");
  console.log(`Creating function Roles:`);
  await createLoginFunctionRole(client);
  await createRegisterFunctionRole(client);

  console.log("\n");
  console.log("-------------");
  console.log("-------------");
  console.log(`Creating user-defined functions:`);
  await createLoginFunction(client);
  await createRegisterFunction(client);

  console.log("\n");
  console.log("-------------");
  console.log("-------------");
  console.log(`Creating user Roles:`);

  await createBootstrapUserRole(client);
  await createLoggedInUserRole(client);

  console.log("\n");
  console.log("-------------");
  console.log("-------------");
  console.log(`Populating data:`);

  // await deleteAllAccounts(client);
  // await deleteAllDinos(client);

  if (accountsResult) await populateAccounts(client);
  if (dinosResult) await populateDinos(client);

  console.log("\n");
  console.log("database setup completed.");
};
