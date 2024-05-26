import { Route, Routes } from "react-router-dom";
import PrivateRoutes from "./PrivateRoutes";
import CreateTask from "./CreateTask";
import ReadTasks from "./ReadTasks";
import UpdateTasks from "./UpdateTasks";
import DeleteTask from "./DeleteTask";
import Home from "../pages/Home";

const RenderRoutes = ({ className }) => {
  return (
    <div className={className}>
      <Routes>
        <Route element={<PrivateRoutes />}>
          <Route exact path="/createtask" element={<CreateTask />} />
          <Route exact path="/readtasks" element={<ReadTasks />} />
          <Route exact path="/update/:id" element={<UpdateTasks />} />
          <Route exact path="/delete/:id" element={<DeleteTask />} />
        </Route>

        <Route exact path="/" element={<Home />} />
      </Routes>
    </div>
  );
};

export default RenderRoutes;
