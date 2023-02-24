import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";

function LogPage({ setUser }) {
  const [showPatern, setShowPatern] = useState("signup");

  const style = {
    container: `flex flex-col  justify-center gap-5 items-center w-full  `,
    btnContainer: `flex my-4 gap-5`,
    btn: ` w-32 border-2 border-500 p-2 font-bold text-gray-800 rounded-md  `,
    formContainer: `bg-slate-200 p-2 rounded-xl w-full max-w-5xl `,
    title: `text-center text-3xl tracking-widest font-bold text-gray-800  `,
  };

  return (
    <div className={style.container}>
      <h1 className={style.title}>TodoListe</h1>
      <div className={style.btnContainer}>
        {/* Bouton s'inscrire */}
        <button
          className={style.btn}
          style={
            showPatern === "signup"
              ? { background: "#A855F7", color: "white" }
              : { opacity: 0.7 }
          }
          onClick={() => setShowPatern("signup")}
        >
          S'inscrire
        </button>

        {/* Bouton se connecter */}
        <button
          className={style.btn}
          style={
            showPatern === "login"
              ? { background: "#A855F7", color: "white" }
              : { opacity: 0.7 }
          }
          onClick={() => setShowPatern("login")}
        >
          Se connecter
        </button>
      </div>
      <div className={style.formContainer}>
        {showPatern === "login" ? (
          <Login setUser={setUser} />
        ) : (
          <Signup setUser={setUser} />
        )}
      </div>
    </div>
  );
}

export default LogPage;
