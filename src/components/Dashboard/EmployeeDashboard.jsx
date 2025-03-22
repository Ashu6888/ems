import React from "react";
import Header from "../other/Header";
import TaskListNumbers from "../other/TaskListNumbers";
import TaskList from "../TaskList/TaskList";

const EmployeeDashboard = (props) => {
  console.log("Employee Dashboard ", props.data);
  const data = JSON.parse(localStorage.getItem("loggedInUser"));
  console.log(data, "Checking");
  if (!data) return;

  return (
    <div className="p-10 bg-[#1C1C1C] h-screen">
      <Header changeUser={props.changeUser} data={data.data} />
      <TaskListNumbers data={data.data} />
      <TaskList data={data.data} />
    </div>
  );
};

export default EmployeeDashboard;
