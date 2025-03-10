import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const acceptTaskHandler = (taskTitle) => {
    console.log(
      userData,
      "Usrrrrrrrrrrrrrrrrddddddddddddddddaaaaaaaaaaaaaaattttttttttttttttaaaaaaaaaaaaa"
    );
    console.log(taskTitle);
    const updatedData = userData.map((user) => {
      console.log(user, "I am a User");
      const updatedTasks = user.tasks.map((task) => {
        // console.log(updatedTasks, "Taskssssssssssssssssssss");
        console.log(task.taskTitle, "I am a Task");
        if (task.taskTitle === taskTitle) {
          console.log("Inside Auth Condition");
          return {
            ...task,
            newTask: false,
            active: true,
            failed: false,
            completed: false,
          };
        }
        return task;
      });

      const activeTasks = updatedTasks.filter((task) => task.active).length;

      console.log(activeTasks, "Accccccccccccccccccc");
      const newTasks = updatedTasks.filter((task) => task.newTask).length;

      return {
        ...user,
        tasks: updatedTasks,
        taskCounts: {
          ...user.taskCounts,
          active: activeTasks, // Update active count
          newTask: newTasks, // Update newTask count
        },
      };
    });

    console.log(updatedData, "updateeeeeeeeeeeeeeeeeeeeeeeeeeeeeddddddddddddd");

    setUserData(updatedData);
  };

  useEffect(() => {
    setLocalStorage();
    const { employees } = getLocalStorage();
    setUserData(employees);
    console.log(employees, "Shivam");
  }, []);

  return (
    <div>
      <AuthContext.Provider value={[userData, setUserData, acceptTaskHandler]}>
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
