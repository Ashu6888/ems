import React, { useContext } from "react";
import { AuthContext } from "../../context/AuthProvider";

const AllTask = () => {
  const [userData] = useContext(AuthContext);

  return (
    <div className="bg-[#1c1c1c] p-5 rounded mt-5">
      {/* Table Header - Large Screen */}
      <div className="bg-red-400 mb-2 py-2 px-4 hidden md:flex justify-between rounded">
        <h2 className="text-lg font-medium w-1/5 text-center">Employee Name</h2>
        <h3 className="text-lg font-medium w-1/5 text-center">New Task</h3>
        <h5 className="text-lg font-medium w-1/5 text-center">Active Task</h5>
        <h5 className="text-lg font-medium w-1/5 text-center">Completed</h5>
        <h5 className="text-lg font-medium w-1/5 text-center">Failed</h5>
      </div>

      {/* Table Header - Small Screen */}
      <div className="bg-red-400 mb-2 py-2 px-4 flex md:hidden justify-between rounded">
        <h2 className="text-lg font-medium w-1/4 text-center">New</h2>
        <h5 className="text-lg font-medium w-1/4 text-center">Active</h5>

        {/* Wrapped Completed + Failed in a div to keep space in header */}
        <div className="w-1/4 flex flex-col items-center gap-1 sm:hidden">
          <h5 className="text-lg font-medium text-center">Completed</h5>
          <h5 className="text-lg font-medium text-center">Failed</h5>
        </div>

        {/* Normal view for screens >=455px */}
        <h5 className="text-lg font-medium w-1/4 text-center hidden sm:block">
          Completed
        </h5>
        <h5 className="text-lg font-medium w-1/4 text-center hidden sm:block">
          Failed
        </h5>
      </div>

      {/* Table Data */}
      <div>
        {userData.map((elem, idx) => (
          <div
            key={idx}
            className="border-2 border-emerald-500 mb-2 py-2 px-4 rounded"
          >
            {/* Large Screen Layout */}
            <div className="hidden md:flex justify-between">
              <h2 className="text-lg font-medium w-1/5 text-center">
                {elem.firstName}
              </h2>
              <h3 className="text-lg font-medium w-1/5 text-blue-400 text-center">
                {elem.taskCounts.newTask}
              </h3>
              <h5 className="text-lg font-medium w-1/5 text-yellow-400 text-center">
                {elem.taskCounts.active}
              </h5>
              <h5 className="text-lg font-medium w-1/5 text-white text-center">
                {elem.taskCounts.completed}
              </h5>
              <h5 className="text-lg font-medium w-1/5 text-red-600 text-center">
                {elem.taskCounts.failed}
              </h5>
            </div>

            {/* Small Screen Layout */}
            <div className="flex md:hidden justify-between flex-wrap items-center">
              {/* First Column: Employee Name + New Task Count */}
              <div className="w-1/4 flex flex-col items-center gap-2">
                <h2 className="text-lg font-medium text-white text-center">
                  {elem.firstName}
                </h2>
                <h3 className="text-lg font-medium text-blue-400 text-center">
                  {elem.taskCounts.newTask}
                </h3>
              </div>

              {/* Active Task Column */}
              <h5 className="text-lg font-medium w-1/4 text-yellow-400 text-center">
                {elem.taskCounts.active}
              </h5>

              {/* Completed + Failed stacked for width < 455px */}
              <div className="w-1/4 flex flex-col items-center gap-2 sm:hidden">
                <h5 className="text-lg font-medium text-white text-center">
                  {elem.taskCounts.completed}
                </h5>
                <h5 className="text-lg font-medium text-red-600 text-center">
                  {elem.taskCounts.failed}
                </h5>
              </div>

              {/* Completed & Failed (Normal View for >455px) */}
              <h5 className="text-lg font-medium w-1/4 text-white text-center hidden sm:block">
                {elem.taskCounts.completed}
              </h5>
              <h5 className="text-lg font-medium w-1/4 text-red-600 text-center hidden sm:block">
                {elem.taskCounts.failed}
              </h5>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllTask;
