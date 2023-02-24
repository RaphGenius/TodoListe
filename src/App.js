import React, { useEffect, useState } from "react";
import { getAuth, onAuthStateChanged } from "firebase/auth";
import MainPage from "./pages/MainPage";
import LogPage from "./pages/LogPage";
import Logout from "./components/Logout";

const style = {
  bg: `h-screen w-screen p-4 bg-gradient-to-r from-[#2F80ED] to-[#1CB5E0] `,
};

function App() {
  const [user, setUser] = useState(null);
  const [isUserPresent, setIsUserPresent] = useState(false);
  const [userId, setUserId] = useState(null);

  useEffect(() => {
    const auth = getAuth();
    onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsUserPresent(true);
        setUserId(user.uid);
      } else {
        setIsUserPresent(false);
        setUserId(null);
      }
    });
  }, [user]);

  return (
    <div className={style.bg}>
      {isUserPresent && <Logout setUser={setUser} />}

      {!isUserPresent && <LogPage setUser={setUser} />}
      {isUserPresent && <MainPage userId={userId} />}
    </div>
  );
}

export default App;
