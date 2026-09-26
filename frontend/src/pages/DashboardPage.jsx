import { useContext } from "react";
import AuthContext from "../context/AuthContext.jsx";

function Dashboard() {
  const { activeRole } = useContext(AuthContext);

  return <h1>{activeRole} Overview</h1>;
}

export default Dashboard;