import React from "react";
import { FaRegTrashAlt } from "react-icons/fa";
import ToolTip from "./ToolTip";
import { motion } from "framer-motion";
const style = {
  li: `flex justify-between bg-slate-200 p-4 my-2 capitalize`,
  liComplete: `flex justify-between bg-slate-400 p-4 my-2 capitalize`,
  row: `flex`,
  text: `ml-2 cursor-pointer`,
  textComplete: `ml-2 cursor-pointer line-through`,
  button: `cursor-pointer flex items-center`,
};

const item = {
  hidden: { y: -100, opacity: 0 },
  visible: {
    y: 0,
    opacity: 1,
  },
};

function Todo({ todo, toggleComplete, deleteTodo }) {
  return (
    <motion.li
      layout
      variants={item}
      exit={{
        x: 500,
        opacity: 0,
        transition: {
          duration: 0.4,
        },
      }}
      className={todo.completed ? style.liComplete : style.li}
    >
      <div className={style.row}>
        <input
          onChange={() => toggleComplete(todo)}
          type="checkbox"
          checked={todo.completed}
        />
        <p
          onClick={() => toggleComplete(todo)}
          className={todo.completed ? style.textComplete : style.text}
        >
          {todo.text}
        </p>
      </div>
      <button onClick={() => deleteTodo(todo.id)}>
        <FaRegTrashAlt />
      </button>
    </motion.li>
  );
}

export default Todo;
