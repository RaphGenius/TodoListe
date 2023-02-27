import React, { useState, useEffect } from "react";
import { AiOutlinePlus } from "react-icons/ai";
import { motion, AnimatePresence } from "framer-motion";
import Todo from "../components/Todo";
import {
  addDoc,
  collection,
  deleteDoc,
  doc,
  onSnapshot,
  query,
  updateDoc,
} from "firebase/firestore";
import { db } from "../utils/firebase";

const style = {
  container: `bg-slate-100 max-w-[500px] w-full m-auto rounded-md shadow-xl p-4 mt-8 overflow-hidden dark:bg-gray-600 `,
  heading: `text-3xl font-bold text-center text-gray-800 p-2 dark:text-slate-200  `,
  form: `flex justify-between`,
  input: `border p-2 w-full text-xl `,
  button: `border p-4 ml-2 sm:mt-0 bg-purple-500 text-slate-100 hover:opacity-80 `,
  count: `text-center mt-2 text-fuchsia-800 dark:text-slate-200 font-bold`,
};
const container = {
  hidden: { opacity: 1, scale: 0 },
  visible: {
    opacity: 1,
    scale: 1,
    transition: {
      delayChildren: 0.3,
      staggerChildren: 0.2,
    },
  },
  exit: { opacity: 0, y: -20 },
};

const pageTransition = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
  },
};
function MainPage({ userId }) {
  const [todos, setTodos] = useState([]);
  const [input, setInput] = useState("");

  //Creer un todo
  const createTodo = async (e) => {
    e.preventDefault();

    await addDoc(collection(db, `${userId}`), {
      text: input,
      completed: false,
      creation_date: new Date(),
    });
    setInput("");
  };
  //Todo non fini
  const todosLeft = () => {
    let num = 0;
    todos.map((t) => (!t.completed ? num++ : ""));
    return num;
  };

  //Lire un todo depuis firebase
  useEffect(() => {
    const q = query(collection(db, `${userId}`));
    const unsubscribe = onSnapshot(q, (querySnapShot) => {
      let todoArray = [];
      querySnapShot.forEach((doc) => {
        todoArray.push({ ...doc.data(), id: doc.id });
      });
      setTodos(todoArray);
    });

    return () => unsubscribe();
  }, [userId]);

  //Update todo dans firebase
  const toggleComplete = async (todo) => {
    await updateDoc(doc(db, `${userId}`, todo.id), {
      completed: !todo.completed,
    });
  };

  //Supprimer un todo
  const deleteTodo = async (id) => {
    await deleteDoc(doc(db, `${userId}`, id));
  };

  return (
    <AnimatePresence mode="sync">
      <motion.div
        variants={pageTransition}
        initial="hidden"
        animate="visible"
        className={style.container}
      >
        <h3 className={style.heading}>Todo Liste</h3>
        <form onSubmit={createTodo} className={style.form}>
          <input
            className={style.input}
            type="text"
            placeholder="Ajouter une tâche"
            required
            autoFocus
            value={input}
            onChange={(e) => setInput(e.target.value)}
          />
          <motion.button whileTap={{ scale: 0.95 }} className={style.button}>
            <AiOutlinePlus size={30} />{" "}
          </motion.button>
        </form>

        <motion.ul variants={container} initial="hidden" animate="visible">
          {todos
            .sort((a, b) => b.creation_date - a.creation_date)
            .map((todo) => (
              <Todo
                key={todo.id}
                todo={todo}
                toggleComplete={toggleComplete}
                deleteTodo={deleteTodo}
              />
            ))}
        </motion.ul>

        <p className={style.count}>
          {todos.length === 0
            ? ""
            : `Il vous reste ${todosLeft()} ${
                todosLeft() > 1 ? "tâches" : "tâche"
              } à finaliser `}
        </p>
      </motion.div>
    </AnimatePresence>
  );
}

export default MainPage;
