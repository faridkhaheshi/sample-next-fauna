import {
  IfNotExist,
  Collection,
  CreateIndex,
  Index,
} from "./../../../../../adapters/fauna";

export const createAllAccountsIndex = async (client) => {
  console.log("creating allAccounts index");
  const index = await client.query(
    IfNotExist(
      Index("allAccounts"),
      CreateIndex({
        name: "allAccounts",
        source: Collection("Accounts"),
        serialized: true,
      })
    )
  );

  if (index === false) console.log(`Index "allAccounts" already exists.`);
  else console.log("created");
  return index;
};
