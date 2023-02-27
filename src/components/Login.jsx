import React, { useRef, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { getError } from "./getError";
import { motion as m } from "framer-motion";
const style = {
  form: `overflow-y-hidden    `,
  label: `font-bold mb-2 text-xl dark:text-slate-200 `,
  inputContainer: `flex flex-col items-center py-2  `,
  input: `w-full rounded-md p-2 text-center text-2xl  dark:bg-slate-400  `,
  confirmContainer: `flex justify-center items-center bg-slate-500 cursor-pointer hover:opacity-90 rounded-md  `,
  submitBtn: `text-center tracking-wider text-2xl p-2 font-bold text-gray-800 rounded-md text-white  dark:text-black  `,
  error: `text-center font-bold text-red-600 my-2 `,
};
function Login({ setUser, showPatern }) {
  const email = useRef();
  const password = useRef();
  const [error, setError] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();

    signInWithEmailAndPassword(
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
    <form onSubmit={onLogin} className={style.form}>
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
        <m.button
          initial={{ opacity: 0, scale: 0 }}
          animate={{ x: 0, opacity: 1, scale: 1 }}
          exit={{ opacity: 0, scale: 0.8 }}
          transition={{ duration: 0.4 }}
          className={style.submitBtn}
          type="submit"
        >
          Se connecter
        </m.button>
      </div>
      <p className={style.error}> {error}</p>
    </form>
  );
}

export default Login;
