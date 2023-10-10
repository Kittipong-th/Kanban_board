import { useLocation } from "react-router-dom";
import Board from "../components/Board";

function Kanban() {
  const location = useLocation();
  const { user } = location.state || {};

  return (
    <div className="h-screen bg-blue-100 text-black">
      <Board username={user.username} />
    </div>
  );
}

export default Kanban;
