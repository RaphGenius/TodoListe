import React from "react";
import { ImCross } from "react-icons/im";
import { getAuth, signOut } from "firebase/auth";

function Logout({ setUser }) {
  const leaveApp = () => {
    const auth = getAuth();
    signOut(auth).then(() => setUser(false));
  };

  return (
    <div
      aria-labelledby="Logout"
      onClick={leaveApp}
      className=" p-4 absolute top-0 right-0 cursor-pointer "
    >
      <ImCross color="white" />
    </div>
  );
}

export default Logout;
