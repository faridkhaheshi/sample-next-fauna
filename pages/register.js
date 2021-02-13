import { useCallback, useState } from "react";
import faunadb, { query as q } from "faunadb";

const { Call } = q;

const faunaClient = new faunadb.Client({
  secret: process.env.NEXT_PUBLIC_FAUNA_BOOTSTRAP_SECRET,
});

const RegisterPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const registerUser = useCallback(
    async (e) => {
      try {
        e.preventDefault();
        const result = await faunaClient.query(
          Call(q.Function("register"), email, password)
        );
        console.log(result);
        alert("Registered. Please log in.");
      } catch (err) {
        console.error(err);
      }
    },
    [email, password, faunaClient]
  );

  return (
    <main className="full-page-centered">
      <form className="simple-form" onSubmit={registerUser}>
        <h3>Register an account</h3>
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
        <button>Register</button>
        <br />
        <a href="/login">Already have an account? Log in.</a>
      </form>
    </main>
  );
};

export default RegisterPage;
