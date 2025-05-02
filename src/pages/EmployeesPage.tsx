import { useState } from "react";

type Employee = {
  id: number;
  name: string;
};

const EmployeesPage = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [employeesIsLoading, setEmployeesIsLoading] = useState(false);
  const [employeesError, setEmployeesError] = useState("");

  const fetchEmployees = async () => {
    try {
      setEmployeesIsLoading(true);
      const res = await fetch("http://localhost:2000/employees", {
        method: "GET",
      });

      const resJson = (await res.json()) as Employee[];

      setEmployees(resJson);
    } catch (error) {
      setEmployeesError((error as TypeError).message);
      alert("Failed to getting employees's data");
    } finally {
      setEmployeesIsLoading(false);
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
      <button disabled={employeesIsLoading} onClick={fetchEmployees}>
        Fetch
      </button>
      {employeesIsLoading && <p>Loading...</p>}
      {employeesError && <p style={{ color: "red" }}>{employeesError}</p>}
    </>
  );
};

export default EmployeesPage;
