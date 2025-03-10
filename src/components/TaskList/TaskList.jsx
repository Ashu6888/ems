import { useContext } from "react";
import AcceptTask from "./AcceptTask";
import NewTask from "./NewTask";
import CompleteTask from "./CompleteTask";
import FailedTask from "./FailedTask";
import { AuthContext } from "../../context/AuthProvider";

const TaskList = ({ data }) => {
  console.log("Dataaaaaaaaaaaaaaa", data);
  const [userData, setUserData, acceptTaskHandler] = useContext(AuthContext);
   console.log(data , 'Dataa frommm')
  return (
    <div
      id="tasklist"
      className="h-[50%] overflow-x-auto flex items-center justify-start gap-5 flex-nowrap w-full py-1 mt-16"
    >
      {data.tasks.map((elem, idx) => {
        console.log(elem, "eleeeeeeeeeeeeeeeeeeeeee");
        if (elem.active) {
          return <AcceptTask key={idx} data={elem} />;
        }
        if (elem.newTask) {
          return (
            <NewTask key={idx} data={elem} onAcceptTask={acceptTaskHandler} />
          );
        }
        if (elem.completed) {
          return <CompleteTask key={idx} data={elem} />;
        }
        if (elem.failed) {
          return <FailedTask key={idx} data={elem} />;
        }
      })}
    </div>
  );
};

export default TaskList;
