import React, { useRef, useState } from "react";
import { getAuth, createUserWithEmailAndPassword } from "firebase/auth";
import { getError } from "./getError";

const style = {
  form: ``,
  label: `font-bold mb-2 text-xl`,
  inputContainer: `flex flex-col items-center py-2 `,
  input: `w-full rounded-md p-2 text-center text-2xl`,
  confirmContainer: `flex justify-center items-center bg-slate-500 cursor-pointer hover:opacity-90 rounded-md `,
  submitBtn: `text-center tracking-wider text-2xl p-2 font-bold text-gray-800 rounded-md text-white  `,
  error: `text-center font-bold text-red-600 my-2 `,
};

function Signup({ setUser }) {
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState("");

  const onRegister = (e) => {
    e.preventDefault();

    const auth = getAuth();
    createUserWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => setUser(userCredential.user))
      .catch((err) => {
        setError(getError(err.code));
        setTimeout(() => {
          setError("");
        }, 3000);
      });
  };

  return (
    <form onSubmit={onRegister} className={style.form}>
      <div>
        <div className={style.inputContainer}>
          <label className={style.label} htmlFor="mail">
            Adresse mail
          </label>
          <input
            ref={email}
            id="mail"
            className={style.input}
            type="email"
            placeholder="mon@adressemail.com"
            required
            autoFocus
            autoComplete="on"
          />
        </div>
        <div className={style.inputContainer}>
          <label className={style.label} htmlFor="password">
            Mot de passe
          </label>
          <input
            ref={password}
            id="password"
            className={style.input}
            type="password"
            required
            autoComplete="off"
          />
        </div>
      </div>
      <div className={style.confirmContainer} style={{ background: "#A855F7" }}>
        <button className={style.submitBtn} type="submit">
          S'inscrire
        </button>
      </div>
      <p className={style.error}> {error}</p>
    </form>
  );
}

export default Signup;
