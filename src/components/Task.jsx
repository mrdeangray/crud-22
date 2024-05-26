import axios from "axios";
import React, { useEffect, useState } from "react";
import { Link } from "react-router-dom";

const Task = ({ task }) => {
  const [score, setScore] = useState(0);

  useEffect(() => {
    // getScore();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const getScore = async () => {
    try {
      const { data } = await axios(`https://api.github.com/users/${task.name}`);
      setScore(data.public_repos);
    } catch (error) {}
  };

  return (
    <div className="box">
      <span>{task.name}</span>
      <span>{task.score}</span>
      <span className="time">{task.modifiedOn.toLocaleString("en-US")}</span>
      <Link to={`/update/${task.id}`}>
        <span>Update</span>
      </Link>
      <Link to={`/delete/${task.id}`}>
        <span>Delete</span>
      </Link>
    </div>
  );
};

export default Task;
