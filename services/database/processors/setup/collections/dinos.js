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

export const createDinosCollection = async (client) => {
  console.log("creating Dinos collection");
  const collection = await client.query(
    IfNotExist(Collection("Dinos"), CreateCollection({ name: "Dinos" }))
  );
  if (collection === false) console.log(`collection "Dinos" already exists`);
  else console.log("created");
  return collection;
};

export const deleteAllDinos = async (client) => {
  console.log("Deleting all Dinos...");
  await client.query(
    If(
      Exists(Collection("Dinos")),
      q.Map(
        Paginate(Documents(Collection("Dinos"))),
        Lambda("ref", Delete(Var("ref")))
      ),
      true
    )
  );
  console.log("Done");
};

export const deleteDinosCollection = (client) =>
  client.query(DeleteIfExists(Collection("Dinos")));

export const populateDinos = async (client) => {
  console.log("populating Dinos collection");
  try {
    await client.query(
      Do(
        Create(Collection("Dinos"), {
          data: {
            name: "Skinny Dino",
            icon: "skinny_dino.png",
            rarity: "exotic",
          },
        }),
        Create(Collection("Dinos"), {
          data: {
            name: "Metal Dino",
            icon: "metal_dino.png",
            rarity: "common",
          },
        }),
        Create(Collection("Dinos"), {
          data: {
            name: "Flower Dino",
            icon: "flower_dino.png",
            rarity: "rare",
          },
        }),
        Create(Collection("Dinos"), {
          data: {
            name: "Grumpy Dino",
            icon: "grumpy_dino.png",
            rarity: "legendary",
          },
        }),
        Create(Collection("Dinos"), {
          data: {
            name: "Old Gentleman Dino",
            icon: "old_gentleman_dino.png",
            rarity: "legendary",
          },
        }),
        Create(Collection("Dinos"), {
          data: {
            name: "Old Lady Dino",
            icon: "old_lady_dino.png",
            rarity: "epic",
          },
        }),
        Create(Collection("Dinos"), {
          data: {
            name: "Sitting Dino",
            icon: "sitting_dino.png",
            rarity: "common",
          },
        }),
        Create(Collection("Dinos"), {
          data: {
            name: "Sleeping Dino",
            icon: "sleeping_dino.png",
            rarity: "uncommon",
          },
        })
      )
    );
    console.log("Done");
  } catch (err) {
    console.log("Already done");
  }
};
