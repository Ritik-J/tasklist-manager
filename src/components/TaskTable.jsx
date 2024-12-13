import axios from "axios";
import "react-tabulator/css/materialize/tabulator_materialize.min.css";
import { useEffect, useState } from "react";
import { ReactTabulator } from "react-tabulator";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import "../index.css";
import { list } from "postcss";
const TaskTable = () => {
  const [taskData, setTaskData] = useState([]);
  const [taskCounts, setTaskCounts] = useState({ done: 0, todo: 0 });

  useEffect(() => {
    fetchData();
  }, []);

  useEffect(() => {
    const updateTaskCounts = () => {
      const doneCount = taskData.filter(
        (task) => task.completed === true
      ).length;
      const todoCount = taskData.filter(
        (task) => task.completed === false
      ).length;
      setTaskCounts({ done: doneCount, todo: todoCount });
    };
    updateTaskCounts();
  }, [taskData]);

  const columns = [
    { title: "Id", field: "id", editor: true },
    {
      title: "Title",
      field: "title",
      editor: true,
      headerFilter: "input",
      headerFilterPlaceholder: "Search Name",
      headerFilterFunc: "like",
    },
    {
      title: "Status",
      field: "completed",
      editor: list,
      editorParams: {
        values: ["ToDo", "Done", "In Progress"],
      },
      formatter: (cell) => {
        const taskData = cell.getData();
        return `
        <select
            name="status"
            class="bg-purple-800 outline-none rounded-md text-center">
            <option>${taskData.completed === true ? "Done" : "ToDo"}</option>
            <option>${taskData.completed === true ? "ToDo" : "Done"}</option>
            <option>In progress</option>
          </select>`;
      },
    },

    {
      title: "Actions",
      formatter: () => {
        return ` <div> <button className="delete-row" onClick={notify}> Delete </button> <div id="toaster-container"></div> </div>`;
      },
      cellClick: (e, cell) => {
        e.preventDefault();
        cell.getRow().delete();
        toast.success("Row deleted!");
      },
    },
  ];

  const fetchData = async () => {
    try {
      const task = await axios.get(
        "https://jsonplaceholder.typicode.com/todos"
      );
      const data = task.data.slice(0, 20);
      setTaskData(data);
    } catch (error) {
      console.error(error.message);
    }
  };

  const addRow = () => {
    const newRow = { id: "", name: "", age: "" };
    setTaskData([newRow, ...taskData]);
    toast.success("Row added!");
    toast.info("double click to edit");
  };

  const options = { pagination: "remote", paginationSize: 10 };

  return (
    <div className="p-5 w-full h-screen">
      <div className="flex gap-5">
        <button
          onClick={addRow}
          className="text-white bg-purple-950 p-2 text-xl rounded-md font-mono mb-2"
        >
          Add Row
        </button>
        <h2 className="text-white bg-purple-950 p-2 text-xl rounded-md font-mono mb-2">
          Task Counter: Done: {taskCounts.done} ToDo: {taskCounts.todo}
        </h2>
      </div>
      <ReactTabulator
        data={taskData}
        columns={columns}
        layout={"fitColumns"}
        options={options}
        className="tabulator"
      />
      <ToastContainer />
    </div>
  );
};
export default TaskTable;
