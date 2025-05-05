import { useFetchEmployees } from "../api/useFetchEmployees";

const EmployeesPage = () => {
  const { employees, employeesError, employeesIsLoading, fetchEmployees } =
    useFetchEmployees();

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
              <tr key={employee.id}>
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
