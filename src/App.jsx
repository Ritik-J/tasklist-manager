import TaskTable from "./components/TaskTable";

const App = () => {
  return (
    <div className="w-full h-screen uppercase">
      <header className="w-full text-indigo-300 font-mono flex flex-col items-center justify-center p-10">
        <h1 className="text-5xl font-bold ">Welcome to Tasklist Manager</h1>
        <p>manage | edit | filter | delete, your task in table</p>
      </header>
      <TaskTable />
    </div>
  );
};

export default App;
