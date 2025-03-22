import React, { useContext, useEffect, useState } from "react";
import Login from "./components/Auth/Login";
import EmployeeDashboard from "./components/Dashboard/EmployeeDashboard";
import AdminDashboard from "./components/Dashboard/AdminDashboard";
import { AuthContext } from "./context/AuthProvider";

const App = () => {
  const [user, setUser] = useState(null);
  const [loggedInUserData, setLoggedInUserData] = useState(null);
  const [userData, SetUserData] = useContext(AuthContext);
  const [showAlert, setShowAlert] = useState(false);
  const [alertMessage, setAlertMessage] = useState("");

  console.log(loggedInUserData, "Simple User Data");

  useEffect(() => {
    const loggedInUser = localStorage.getItem("loggedInUser");
    if (loggedInUser) {
      const userData = JSON.parse(loggedInUser);
      setUser(userData.role);
      setLoggedInUserData(userData.data);
      console.log("Mai hu user ka data", userData.role, "Role", userData.data);
    }
  }, []);

  const handleLogin = (email, password) => {
    if (email == "Anu@gmail.com" && password == "123") {
      setUser("admin");
      localStorage.setItem("loggedInUser", JSON.stringify({ role: "admin" }));
    } else if (userData) {
      console.log("Inside Else Iff");
      const employee = userData.find(
        (e) => email == e.email && e.password == password
      );
      if (employee) {
        setUser("employee");
        setLoggedInUserData(employee);
        localStorage.setItem(
          "loggedInUser",
          JSON.stringify({ role: "employee", data: employee })
        );
      } else {
        setAlertMessage("Invalid credentials");
        setShowAlert(true);

        setTimeout(() => {
          setShowAlert(false);
        }, 2000);
      }
    }
  };


  console.log(loggedInUserData, "Saala Tye hai fasad ki add");

  return (
    <>
      {!user ? <Login handleLogin={handleLogin} /> : ""}
      {showAlert && (
        <div className="alert fixed top-5 left-1/2 transform -translate-x-1/2 p-2.5 px-5 bg-lightcoral border border-red-500 rounded-lg text-white z-50">
          {alertMessage}
        </div>
      )}
      {user == "admin" ? (
        <AdminDashboard changeUser={setUser} />
      ) : user == "employee" ? (
        <EmployeeDashboard changeUser={setUser} data={loggedInUserData} />
      ) : null}
    </>
  );
};

export default App;
