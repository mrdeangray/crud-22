import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TaskContext } from "../context/TaskProvider";
import { Link, useNavigate, useParams } from "react-router-dom";

const Input = styled.input`
  border: 2px solid green;
  border-radius: 10px;
  font-size: 20px;
`;

const Msg = styled.p`
  color: blue;
  font-size: 22px;
`;

const UpdateTasks = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);
  const [inputValue, setInputValue] = useState("");
  const [isUpdatiing, setIsUpdating] = useState(false);
  const [currTask, setCurrTask] = useState({});
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  useEffect(() => {
    const curr = tasks.find((task) => task.id === id);
    setInputValue(curr.name);
    setCurrTask(curr);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleSubmit = (event) => {
    event.preventDefault();

    const newTasks = tasks.map((task) => {
      if (task.id === id) {
        task.name = inputValue;
        task.modifiedOn = new Date()
      }
      return task;
    });
    setTasks(newTasks);
    setInputValue("");
    localStorage.setItem("crud-22-tasks", JSON.stringify(newTasks));
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      navigate("/readtasks");
    }, 2000);
  };

  return (
    <div>
      <h3>UpdateTask: {currTask.name}</h3>
      <Link to={`/`}>Back</Link>
      <form onSubmit={handleSubmit}>
        <Input autoFocus value={inputValue} onChange={handleChange} />
      </form>
      {tasks?.map((task) => {
        return <span key={task.id}>{task.name}, </span>;
      })}
      {isUpdatiing && <Msg>Updating...</Msg>}
    </div>
  );
};

export default UpdateTasks;
