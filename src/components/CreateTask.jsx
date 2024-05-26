import React, { useContext, useState } from "react";
import styled from "styled-components";
import { v4 as uuid } from "uuid";
import { TaskContext } from "../context/TaskProvider";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const Input = styled.input`
  border: 2px solid green;
  border-radius: 10px;
  font-size: 20px;
`;

const Msg = styled.p`
  color: blue;
  font-size: 22px;
`;

const CreateTask = () => {
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);
  const [inputValue, setInputValue] = useState("");
  const [isUpdatiing, setIsUpdating] = useState(false);
  const handleChange = (event) => {
    setInputValue(event.target.value);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    const task = {};
    task.id = uuid();

    task.name = inputValue;
    try {
      const { data } = await axios(`https://api.github.com/users/${task.name}`);
      task.score = data.public_repos;
    } catch (error) {}
    task.createOn = new Date();
    task.modifiedOn = new Date();

    const newTasks = [...tasks, task];

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
      <h3>CreateTask</h3>
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

export default CreateTask;
