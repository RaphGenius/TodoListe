import React, { useState } from "react";
import Login from "../components/Login";
import Signup from "../components/Signup";
import { AnimatePresence, motion } from "framer-motion";

function LogPage({ setUser }) {
  const [showPatern, setShowPatern] = useState("signup");

  const style = {
    container: `flex flex-col  justify-center gap-5 items-center w-full    `,
    btnContainer: `flex my-4 gap-5`,
    btn: ` w-32 border-2 border-500 p-2 font-bold text-gray-800 rounded-md  dark:text-slate-200  `,
    formContainer: `bg-slate-200 p-2 rounded-xl w-full max-w-5xl dark:bg-slate-800  `,
    title: `text-center text-3xl tracking-widest font-bold text-gray-800 dark:text-slate-200  `,
  };
  const pageTransition = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
    },
  };
  return (
    <motion.div
      variants={pageTransition}
      initial="hidden"
      animate="visible"
      className={style.container}
    >
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
      <AnimatePresence mode="popLayout" initial={false}>
        <div className={style.formContainer}>
          {showPatern === "login" ? (
            <Login setUser={setUser} showPatern={showPatern} />
          ) : (
            <Signup setUser={setUser} showPatern={showPatern} />
          )}
        </div>
      </AnimatePresence>
    </motion.div>
  );
}

export default LogPage;
