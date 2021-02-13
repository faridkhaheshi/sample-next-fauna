import {
  Create,
  Do,
  Exists,
  If,
  IfNotExist,
  Collection,
  CreateCollection,
  q,
  Paginate,
  Documents,
  Lambda,
  Delete,
  Var,
  DeleteIfExists,
} from "./../../../../../adapters/fauna";

export const createAccountsCollection = async (client) => {
  console.log("creating accounts collection");
  const accountsCollection = await client.query(
    IfNotExist(Collection("Accounts"), CreateCollection({ name: "Accounts" }))
  );
  if (accountsCollection === false)
    console.log(`collection "Accounts" already exists`);
  else console.log("created");
  return accountsCollection;
};

export const deleteAllAccounts = async (client) => {
  console.log("Deleting all Accounts...");
  await client.query(
    If(
      Exists(Collection("Accounts")),
      q.Map(
        Paginate(Documents(Collection("Accounts"))),
        Lambda("ref", Delete(Var("ref")))
      ),
      true
    )
  );

  console.log("Done");
};

export const deleteAccountsCollection = (client) =>
  client.query(DeleteIfExists(Collection("Accounts")));

export const populateAccounts = async (client) => {
  console.log("populating accounts collection");
  try {
    await client.query(
      Do(
        Create(Collection("Accounts"), {
          data: {
            email: "normal@test.com",
            type: "normal",
          },
          credentials: {
            password: "testtest",
          },
        }),
        Create(Collection("Accounts"), {
          data: {
            email: "admin@test.com",
            type: "admin",
          },
          credentials: {
            password: "testtest",
          },
        })
      )
    );
    console.log("Done");
  } catch (err) {
    console.log("Already done");
  }
};
