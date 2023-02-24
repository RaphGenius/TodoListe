import React, { useRef } from "react";
import { getAuth, signInWithEmailAndPassword } from "firebase/auth";
const style = {
  form: ``,
  label: `font-bold mb-2 text-xl`,
  inputContainer: `flex flex-col items-center py-2 `,
  input: `w-full rounded-md p-2 text-center text-2xl`,
  confirmContainer: `flex justify-center items-center bg-slate-500 cursor-pointer hover:opacity-90 rounded-md `,
  submitBtn: `text-center tracking-wider text-2xl p-2 font-bold text-gray-800 rounded-md text-white  `,
};

function Login({ setUser }) {
  const email = useRef();
  const password = useRef();

  const onLogin = (e) => {
    e.preventDefault();
    const auth = getAuth();
    signInWithEmailAndPassword(
      auth,
      email.current.value,
      password.current.value
    ).then((userCredential) => setUser(userCredential.user));
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
    </form>
  );
}

export default Login;
