import { useState } from "react";

type EmployeeResponse = {
  id: number;
  name: string;
};

export const useFetchEmployees = () => {
  const [employees, setEmployees] = useState<EmployeeResponse[]>([]);
  const [employeesIsLoading, setEmployeesIsLoading] = useState(false);
  const [employeesError, setEmployeesError] = useState("");

  const fetchEmployees = async () => {
    try {
      setEmployeesIsLoading(true);
      const res = await fetch("http://localhost:2000/employees", {
        method: "GET",
      });

      const resJson = (await res.json()) as EmployeeResponse[];

      setEmployees(resJson);
    } catch (error) {
      setEmployeesError((error as TypeError).message);
    } finally {
      setEmployeesIsLoading(false);
    }
  };

  return {
    fetchEmployees,
    employeesIsLoading,
    employeesError,
    employees,
  };
};
