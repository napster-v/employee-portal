import "./App.css";
import { Route, Routes } from "react-router-dom";
import EmployeeForm from "./components/EmployeeForm";
import Home from "./components/Home";
import { EmployeeDirectory } from "./components/EmployeeDirectory";
import EmployeeEdit from "./components/EmployeeEdit";

function App() {
  return (
    <Routes>
      <Route path="/" element={<Home />} />
      <Route path="/employees">
        <Route index element={<EmployeeDirectory />} />
        <Route path="add" element={<EmployeeForm />} />
        <Route path=":id" element={<EmployeeEdit />} />
      </Route>
      <Route path="*" element={<h1>Not Found</h1>} />
    </Routes>
  );
}

export default App;
