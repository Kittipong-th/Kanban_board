import { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import Column from "./Column";
import PropTypes from "prop-types";
import sampleData from "../Mockup_data/kanban_data";
import Editable from "../components/Editable";

function Board({ username }) {
  const initialColumns =
    JSON.parse(localStorage.getItem("kanbanColumns")) || sampleData;
  const [columns, setColumns] = useState(initialColumns);
  const [newColumn, setNewColumn] = useState("");

  const navigate = useNavigate();

  useEffect(() => {
    localStorage.setItem("kanbanColumns", JSON.stringify(columns));
  }, [columns]);

  const addColumn = () => {
    if (newColumn) {
      const updatedColumns = { ...columns, [newColumn]: [] };
      setColumns(updatedColumns);
      setNewColumn("");
    }
  };

  const deleteColumn = (columnId) => {
    const updatedColumns = { ...columns };
    console.log(columnId);
    delete updatedColumns[columnId];
    console.log(updatedColumns);
    setColumns(updatedColumns);
    window.location.reload(true);
  };

  const logout = () => {
    navigate("/");
  };
  return (
    <div className="h-full grid grid-cols-5">
      <div className="col-span-1 bg-gray-900 drop-shadow-2xl  ">
        <div className="text-gray-100 text-xl">
          <div className="p-2.5 mt-1 flex items-center">
            <i className="bi bi-app-indicator px-2 py-1 rounded-md bg-blue-600"></i>
            <h1 className="font-bold text-gray-200 text-[15px] ml-3">
              {username}
            </h1>
            <i className="bi bi-x cursor-pointer ml-28 lg:hidden"></i>
          </div>
          <div className="my-2 bg-gray-600 h-[1px]"></div>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ml-1 mr-1">
          <i className="bi bi-house-door-fill"></i>
          <span className="text-[15px] ml-4 text-gray-200 font-bold">Home</span>
        </div>
        <div className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ml-1 mr-1">
          <i className="bi bi-person-circle"></i>
          <span className="text-[15px] ml-4 text-gray-200 font-bold">
            Profile
          </span>
        </div>
        <div
          onClick={logout}
          className="p-2.5 mt-3 flex items-center rounded-md px-4 duration-300 cursor-pointer hover:bg-blue-600 text-white ml-1 mr-1"
        >
          <i className="bi bi-box-arrow-in-right"></i>
          <span className="text-[15px] ml-4 text-gray-200 font-bold">
            Logout
          </span>
        </div>
      </div>

      <div className="col-span-4 flex flex-col bg-blue-100 ">
        <div className="m-1 text-2xl font-bold bg-slate-200 p-4 text-black flex gap-6">
          <Editable initialText="Kanban Board" uniqueKey={"Col"} />
        </div>
        <div className="m-5 mt-0 text-xl font-bold bg-slate-200 p-5 text-black flex gap-6">
          <input
            className="p-2"
            type="text"
            value={newColumn}
            onChange={(e) => setNewColumn(e.target.value)}
            required
          />

          <button
            className="p-2 bg-slate-600 rounded-md text-white"
            onClick={addColumn}
          >
            Add Column
          </button>
        </div>
        <div className="grid xl:grid-cols-4 lg:grid-cols-3 md:grid-cols-2 sm:grid-cols-2 m-5 gap-4">
          {Object.keys(columns).map((columnKey, index) => (
            <Column
              key={index}
              title={columnKey}
              tasks={columns[columnKey]}
              onDelete={() => deleteColumn(columnKey)}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

Board.propTypes = {
  username: PropTypes.string.isRequired,
};

export default Board;
