import { useState } from "react";

type Employee = {
  id: number;
  name: string;
};

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);

  const fetchEmployees = async () => {
    try {
      const res = await fetch("http://localhost:2000/employees", {
        method: "GET",
      });

      const resJson = (await res.json()) as Employee[];

      setEmployees(resJson);
    } catch (error) {
      alert("Failed to getting employees's data");
    }
  };

  return (
    <>
      <h1>Employees Page</h1>
      <table>
        <thead>
          <tr>
            <td>ID</td>
            <td>Name</td>
          </tr>
        </thead>
        <tbody>
          {employees.map((employee) => {
            return (
              <tr>
                <td>{employee.id}</td>
                <td>{employee.name}</td>
              </tr>
            );
          })}
        </tbody>
      </table>
      <button onClick={fetchEmployees}>Fetch</button>
    </>
  );
};

export default EmployeesPage;
