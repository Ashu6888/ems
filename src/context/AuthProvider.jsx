import React, { createContext, useEffect, useState } from "react";
import { getLocalStorage, setLocalStorage } from "../utils/localStorage";

export const AuthContext = createContext();

const AuthProvider = ({ children }) => {
  const [userData, setUserData] = useState(null);

  const acceptTaskHandler = (taskTitle) => {
    const updatedData = userData.map((user) => {
      const updatedTasks = user.tasks.map((task) =>
        task.taskTitle === taskTitle
          ? {
              ...task,
              newTask: false,
              active: true,
              failed: false,
              completed: false,
            }
          : task
      );

      const activeTasks = updatedTasks.filter((task) => task.active).length;
      const newTasks = updatedTasks.filter((task) => task.newTask).length;

      return {
        ...user,
        tasks: updatedTasks,
        taskCounts: {
          ...user.taskCounts,
          active: activeTasks,
          newTask: newTasks,
        },
      };
    });

    setUserData(updatedData);
    localStorage.setItem("employees", JSON.stringify(updatedData));

    // Get the logged-in user from localStorage
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser && loggedInUser.role === "employee") {
      // Find the updated logged-in user from the updatedData array
      const updatedLoggedInUser = updatedData.find(
        (user) => user.email === loggedInUser.data.email
      );

      if (updatedLoggedInUser) {
        // Update localStorage with the modified logged-in user data
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: updatedLoggedInUser })
        );

        console.log("Updated LoggedInUser:", updatedLoggedInUser);
      }
    }

    return updatedData;
  };

  const onCompleteTask = (taskTitle) => {
    const updatedData = userData.map((user) => {
      const updatedTasks = user.tasks.map((task) =>
        task.taskTitle === taskTitle
          ? {
              ...task,
              completed: true,
              newTask: false,
              active: false,
              failed: false,
            }
          : task
      );

      const completedTasks = updatedTasks.filter(
        (task) => task.completed
      ).length;
      const activeTasks = updatedTasks.filter((task) => task.active).length;
      const newTasks = updatedTasks.filter((task) => task.newTask).length;

      return {
        ...user,
        tasks: updatedTasks,
        taskCounts: {
          ...user.taskCounts,
          completed: completedTasks,
          active: activeTasks,
          newTask: newTasks,
        },
      };
    });

    setUserData(updatedData);
    localStorage.setItem("employees", JSON.stringify(updatedData));

    // Update logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser && loggedInUser.role === "employee") {
      const updatedLoggedInUser = updatedData.find(
        (user) => user.email === loggedInUser.data.email
      );

      if (updatedLoggedInUser) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: updatedLoggedInUser })
        );

        console.log(
          "Updated LoggedInUser (Task Completed):",
          updatedLoggedInUser
        );
      }
    }

    return updatedData;
  };

  const onFailedTask = (taskTitle) => {
    const updatedData = userData.map((user) => {
      const updatedTasks = user.tasks.map((task) =>
        task.taskTitle === taskTitle
          ? {
              ...task,
              completed: false,
              newTask: false,
              active: false,
              failed: true,
            }
          : task
      );

      const failedTasks = updatedTasks.filter((task) => task.failed).length;
      const activeTasks = updatedTasks.filter((task) => task.active).length;
      const newTasks = updatedTasks.filter((task) => task.newTask).length;

      return {
        ...user,
        tasks: updatedTasks,
        taskCounts: {
          ...user.taskCounts,
          active: activeTasks,
          newTask: newTasks,
          failed: failedTasks,
        },
      };
    });

    setUserData(updatedData);
    localStorage.setItem("employees", JSON.stringify(updatedData));

    // Update logged-in user
    const loggedInUser = JSON.parse(localStorage.getItem("loggedInUser"));

    if (loggedInUser && loggedInUser.role === "employee") {
      const updatedLoggedInUser = updatedData.find(
        (user) => user.email === loggedInUser.data.email
      );

      if (updatedLoggedInUser) {
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: updatedLoggedInUser })
        );

        console.log(
          "Updated LoggedInUser (Task Completed):",
          updatedLoggedInUser
        );
      }
    }

    return updatedData;
  };

  useEffect(() => {
    // setLocalStorage();
    const { employees } = getLocalStorage();
    setUserData(employees);
    console.log(employees, "Shivam");
  }, []);

  return (
    <div>
      <AuthContext.Provider
        value={[
          userData,
          setUserData,
          acceptTaskHandler,
          onCompleteTask,
          onFailedTask,
        ]}
      >
        {children}
      </AuthContext.Provider>
    </div>
  );
};

export default AuthProvider;
