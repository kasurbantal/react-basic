const EmployeesPage = () => {
  const fetchEmployees = async () => {
    const request = await fetch("http://localhost:2000/employees");
    console.log(request);
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
          <tr>
            <td>1</td>
            <td>Luwak</td>
          </tr>
        </tbody>
      </table>
      <button onClick={fetchEmployees}>Fetch</button>
    </>
  );
};

export default EmployeesPage;
