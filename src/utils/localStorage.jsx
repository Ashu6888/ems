const employees = [
  {
    id: 1,
    firstName: "Arjun",
    email: "Arjun@gmail.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 0,
      completed: 0,
      failed: 0,
    },
    tasks: [],
  },
  {
    id: 2,
    firstName: "Sneha",
    email: "Sneha@gmail.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 0,
      completed: 0,
      failed: 0,
    },
    tasks: [],
  },
  {
    id: 3,
    firstName: "Ashu",
    email: "Ashu@gmail.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 0,
      completed: 0,
      failed: 0,
    },
    tasks: [],
  },
  {
    id: 4,
    firstName: "Priya",
    email: "Priya@gmail.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 0,
      completed: 0,
      failed: 0,
    },
    tasks: [],
  },
  {
    id: 5,
    firstName: "Krishna",
    email: "Krishna@gmail.com",
    password: "123",
    taskCounts: {
      active: 0,
      newTask: 0,
      completed: 0,
      failed: 0,
    },
    tasks: [],
  },
];

const admin = [
  {
    id: 1,
    email: "admin@example.com",
    password: "123",
  },
];

export const setLocalStorage = () => {
  localStorage.setItem("employees", JSON.stringify(employees));
  localStorage.setItem("admin", JSON.stringify(admin));
};
export const getLocalStorage = () => {
  const employees = JSON.parse(localStorage.getItem("employees"));
  const admin = JSON.parse(localStorage.getItem("admin"));

  return { employees, admin };
};
