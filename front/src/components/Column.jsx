import { useState, useEffect } from "react";
import Task from "./Task";
import PropTypes from "prop-types";

const Column = ({ title, onDelete }) => {
  const [isEditing, setIsEditing] = useState(false);
  const [text, setText] = useState(title);
  const [addtask, setAddTasks] = useState([]);

  useEffect(() => {
    const storedTitle = localStorage.getItem(`columnTitle_${title}`);
    const storedTasks =
      JSON.parse(localStorage.getItem(`columnTasks_${title}`)) || [];

    if (storedTitle && storedTitle.trim() !== "") {
      setText(storedTitle);
    }

    setAddTasks(storedTasks);
  }, [title]);

  const handleDoubleclick = () => {
    setIsEditing(true);
  };

  const handleBlur = () => {
    if (text.trim() !== "") {
      setIsEditing(false);
      localStorage.setItem(`columnTitle_${title}`, text);
    }
  };

  const handleChange = (e) => {
    setText(e.target.value);
  };

  const [showForm, setShowForm] = useState(false);

  const toggleForm = () => {
    setShowForm(!showForm);
  };

  const handleTaskSubmit = (e) => {
    e.preventDefault();
    const taskDescription = e.target.elements.taskDescription.value;
    if (taskDescription.trim() !== "") {
      const tasks =
        JSON.parse(localStorage.getItem(`columnTasks_${title}`)) || [];
      tasks.push(taskDescription);
      localStorage.setItem(`columnTasks_${title}`, JSON.stringify(tasks));

      // Update the addtask state
      setAddTasks([...addtask, taskDescription]);

      console.log("Task saved:", taskDescription);
      setShowForm(false);
    }
  };

  const DeleteTask = (index) => {
    const updatedTasks = [...addtask];
    updatedTasks.splice(index, 1);
    localStorage.setItem(`columnTasks_${title}`, JSON.stringify(updatedTasks));
    setAddTasks(updatedTasks);
  };

  return (
    <>
      <div className="col h-max p-5 bg-white rounded-lg shadow-lg">
        {isEditing ? (
          <div className="flex justify-between items-center mb-8">
            <input
              type="text"
              value={text}
              onChange={handleChange}
              onBlur={handleBlur}
            />
            <button
              className="bg-white rounded-md drop-shadow-lg text-black p-1 hover:bg-black hover:text-white transition-colors duration-700 hover:translate-y-px"
              onClick={onDelete}
            >
              delete
            </button>
          </div>
        ) : (
          <div className="flex justify-between items-center mb-8">
            <h3
              className="font-semibold text-xl uppercase break-all"
              onDoubleClick={handleDoubleclick}
            >
              {text}
            </h3>
            <button
              onClick={onDelete}
              className="bg-white rounded-md drop-shadow-lg text-black p-1 hover:bg-black hover:text-white transition-colors duration-700 hover:translate-y-px"
            >
              delete
            </button>
          </div>
        )}
        <div className="tasks flex flex-col gap-5">
          {showForm ? (
            <div>
              <form
                className="bg-blue-300 text-black p-4 rounded-md "
                onSubmit={handleTaskSubmit}
              >
                <textarea
                  className="w-56 p-2 bg-transparent text-white placeholder-white border-0 border-b-2 focus:outline-none "
                  name="taskDescription"
                  placeholder="Task Description"
                ></textarea>
                <div className="flex justify-between">
                  <button
                    className="p-1 bg-blue-600 text-white rounded-md"
                    type="submit"
                  >
                    Save
                  </button>
                  <button
                    className="p-1 bg-blue-600 text-white rounded-md "
                    onClick={() => {
                      setShowForm(false);
                    }}
                    type="cancle"
                  >
                    Cancel
                  </button>
                </div>
              </form>
            </div>
          ) : (
            <div
              className="break-all flex justify-center cursor-pointer bg-blue-300 p-4 rounded-md text-white"
              onClick={toggleForm}
            >
              +
            </div>
          )}

          {addtask.map((task, index) => (
            <Task
              key={index}
              text={task}
              onDoubleClick={handleDoubleclick}
              onDeleteTask={() => DeleteTask(index)}
            />
          ))}
        </div>
      </div>
    </>
  );
};

Column.propTypes = {
  title: PropTypes.string.isRequired,
  onDelete: PropTypes.func.isRequired,
};

export default Column;
