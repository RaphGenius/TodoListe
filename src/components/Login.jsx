import React, { useRef, useState } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
import { InfinitySpin } from "react-loader-spinner";
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

function Login({ setUser }) {
  const email = useRef();
  const password = useRef();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");

  const onLogin = (e) => {
    e.preventDefault();
    setIsLoading(true);
    const auth = getAuth();

    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    )
      .then((userCredential) => setUser(userCredential.user))
      .then(() => setIsLoading(false))
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
            Adresse Mail
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
          Se connecter
        </button>
      </div>
      <p className={style.error}> {error}</p>
    </form>
  );
}

export default Login;
