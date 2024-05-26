import React, { useContext, useEffect, useState } from "react";
import styled from "styled-components";
import { TaskContext } from "../context/TaskProvider";
import { Link, useNavigate, useParams } from "react-router-dom";



const Msg = styled.p`
  color: blue;
  font-size: 22px;
`;

const DeleteTask = () => {
  const { id } = useParams();
  const navigate = useNavigate();
  const { tasks, setTasks } = useContext(TaskContext);
  const [isUpdatiing, setIsUpdating] = useState(false);
  const [currTask, setCurrTask] = useState({});


  useEffect(() => {
    const curr = tasks.find((task) => task.id === id);
    setCurrTask(curr);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const handleDelete = (event) => {
    event.preventDefault();

    const newTasks = tasks.filter((task) => task.id !== id);

    setTasks(newTasks);
    localStorage.setItem("crud-22-tasks", JSON.stringify(newTasks));
    setIsUpdating(true);
    setTimeout(() => {
      setIsUpdating(false);
      navigate("/readtasks");
    }, 2000);
  };

  return (
    <div>
      <h3>DeleteTask: {currTask.name}</h3>
      <Link to={`/`}>Back</Link>
      <div>
        <button onClick={handleDelete}>DeleteTask: {currTask.name}</button>
      </div>

      {tasks?.map((task) => {
        return <span key={task.id}>{task.name}, </span>;
      })}
      {isUpdatiing && <Msg>Updating...</Msg>}
    </div>
  );
};

export default DeleteTask;
