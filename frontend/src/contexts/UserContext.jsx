import React, {
  createContext,
  useContext,
  useState,
  useMemo,
  // useEffect,
} from "react";
import PropTypes from "prop-types";
// import { useNavigate } from "react-router-dom";

const UserContext = createContext();

export default UserContext;

function UserContextProvider({ children }) {
  // const navigate = useNavigate();
  const [user, setUser] = useState();

  const userMemo = useMemo(() => ({ user, setUser }));

  // useEffect(() => {
  //   fetch(`${import.meta.env.VITE_BACKEND_URL}/api/users/readCookie`, {
  //     method: "POST",
  //     credentials: "include",
  //     headers: {
  //       "Content-Type": "application/json",
  //     },
  //   })
  //     .then((res) => res.json())
  //     .then((data) => {
  //       setUser(data);
  //     })
  //     .catch((err) => {
  //       navigate("/");
  //       console.error(err);
  //     });
  // }, []);

  return (
    <UserContext.Provider value={userMemo}>{children}</UserContext.Provider>
  );
}

const useUserContext = () => useContext(UserContext);

UserContextProvider.propTypes = { children: PropTypes.elementType.isRequired };

export { UserContextProvider, useUserContext };
