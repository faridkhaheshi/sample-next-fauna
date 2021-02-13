import {
  IfNotExist,
  Collection,
  CreateIndex,
  Index,
} from "./../../../../../adapters/fauna";

export const createAccountByEmailIndex = async (client) => {
  console.log("creating accountByEmail index");
  const index = await client.query(
    IfNotExist(
      Index("accountByEmail"),
      CreateIndex({
        name: "accountByEmail",
        source: Collection("Accounts"),
        terms: [
          {
            field: ["data", "email"],
          },
        ],
        unique: true,
        serialized: true,
      })
    )
  );

  if (index === false) console.log(`Index "accountByEmail" already exists.`);
  else console.log("created");
  return index;
};
