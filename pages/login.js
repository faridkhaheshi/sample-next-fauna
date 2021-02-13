import { useCallback, useState } from "react";
import faunadb, { query as q } from "faunadb";

const { Call } = q;

const faunaClient = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNA_BOOTSTRAP_SECRET,
});

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const logInUser = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const result = await faunaClient.query(
          Call(q.Function("login"), email, password)
        );
        console.log(result);
      } catch (err) {
        console.error(err);
      }
    },
    [email, password, faunaClient]
  );

  return (
    <main className="full-page-centered">
      <form className="simple-form" onSubmit={logInUser}>
        <h3>Log in</h3>
        <input
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button>Log In</button>
        <br />
        <a href="/register">Register an account.</a>
      </form>
    </main>
  );
};

export default LoginPage;
