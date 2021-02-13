// import faunadb, { query as q } from "faunadb";

// const dbClient = new faunadb.Client({ secret: process.env.FAUNA_SECRET });

export default async (req, res) => {
  // const result = await dbClient.query(
  //   q.Map(
  //     q.Paginate(q.Match(q.Index("all_customers"))),
  //     q.Lambda((x) => q.Get(x))
  //   )
  // );
  res.statusCode = 200;
  res.json({ hi: "dude" });
};
