import {useContext} from "react";
import AuthContext from "../context/AuthContext";

//export default () => useContext(AuthContext);

//correccion de Agustin
const useAuth = () => useContext(AuthContext);
export default useAuth;