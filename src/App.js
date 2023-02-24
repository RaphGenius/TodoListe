import React, { useState } from "react";

import MainPage from "./pages/MainPage";
import LogPage from "./pages/LogPage";
import Logout from "./components/Logout";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0] `,
};

function App() {
  const [user, setUser] = useState(false);

  return (
    <div className={style.bg}>
      {user && <Logout setUser={setUser} />}

      {!user && <LogPage setUser={setUser} />}
      {user && <MainPage />}
    </div>
  );
}

export default App;
