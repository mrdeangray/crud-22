import React, { useContext, useState } from "react";
import { TaskContext } from "../context/TaskProvider";
import Task from "./Task";
import { Link } from "react-router-dom";

const sortOptions = {
  ascending: (a, b) => a.name.localeCompare(b.name),
  descending: (a, b) => b.name.localeCompare(a.name),
  score: (a, b) => a.score - b.score,
};

const ReadTasks = () => {
  const [searchTerm, setSearchTerm] = useState("");
  const { tasks } = useContext(TaskContext);
  const [sortBy, setSortBy] = useState(undefined);

  const handleSortChange = (e) => {
    setSortBy(e.target.value);
  };

  const handleChange = (e) => {
    setSearchTerm(e.target.value);
  };

  return (
    <div>
      <Link to={`/`}>Back</Link>
      <form>
        <input
          type="text"
          autoFocus
          value={searchTerm}
          onChange={handleChange}
        />
      </form>

      <form onChange={handleSortChange}>
        <span className="sort_by">Sort By:</span>
        <label>
          <input type="radio" name="sort_order" value="ascending"></input>
          A-Z (↑)
        </label>
        <label>
          <input type="radio" name="sort_order" value="descending"></input>
          Z-A (↓)
        </label>
        <label>
          <input type="radio" name="sort_order" value="score"></input>
          score
        </label>
      </form>

      <h4>ReadTasks</h4>

      <div>
        {tasks
          ?.sort(sortOptions[sortBy])
          .filter((elem) => elem.name.includes(searchTerm))
          .map((task) => {
            return <Task key={task.id} task={task} />;
          })}
      </div>
      <Link to={`/createtask`}>
        <button>Create Task</button>
      </Link>
    </div>
  );
};

export default ReadTasks;
