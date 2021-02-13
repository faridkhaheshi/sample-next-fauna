import { useCallback, useState, useEffect } from "react";
import faunadb, { query as q } from "faunadb";

const { Call, Paginate, Documents, Collection, Lambda, Get, Var } = q;

// const loggedInSecret = "fnEEB7uu-RACBwQHW7bIYAYIpdWZVZgIQaTltM7JrS1G-qh_HXk";
const loggedInSecret = "fnEEB7uu-RACBwQHW7bIYAYIpdWZVZgIQaTltM7JrS1G-qh_HXk";

const faunaClient = new faunadb.Client({
  secret: loggedInSecret,
});

export default function Home() {
  const loadDinos = useCallback(async () => {
    try {
      const dinos = await faunaClient.query(
        q.Map(
          Paginate(Documents(Collection("Dinos"))),
          Lambda(["dinoRef"], Get(Var("dinoRef")))
        )
      );
      console.log(dinos);
    } catch (err) {
      console.error(err);
    }
  }, []);

  useEffect(() => {
    console.log("loading dinos");
    loadDinos();
  }, []);

  return <main className="full-page-centered">Dinos</main>;
}
