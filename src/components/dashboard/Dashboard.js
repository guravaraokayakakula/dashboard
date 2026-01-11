import React, { useState } from "react";
import EmployeeSummary from "./EmployeeSummary";
import EmployeeForm from "./EmployeeForm";
import EmployeeList from "./EmployeeList";
import SearchFilter from "./SearchFilter";

const Dashboard = () => {
  //  Main Employees State (source of truth)
  const [employees, setEmployees] = useState([
    {
      id: "EMP001",
      name: "Virat Kohli",
      gender: "Male",
      dob: "1988-11-05",
      state: "Delhi",
      active: true,
      image: ""
    },
    {
      id: "EMP002",
      name: "Rohit Sharma",
      gender: "Male",
      dob: "1987-04-30",
      state: "Mumbai",
      active: false,
      image: ""
    },
    {
      id: "EMP003",
      name: "Sirisha",
      gender: "Female",
      dob: "2002-07-03",
      state: "Hyderabad",
      active: true,
      image: ""
    }
  ]);

  // Edit State
  const [editingEmployee, setEditingEmployee] = useState(null);

  //  Search + Filter state
  const [search, setSearch] = useState("");
  const [gender, setGender] = useState("All");
  const [status, setStatus] = useState("All");

  //  Combined Filtering (WORKING LOGIC)
  const filteredEmployees = employees.filter((emp) => {
    const searchMatch = emp.name
      .toLowerCase()
      .includes(search.trim().toLowerCase());

    const genderMatch = gender === "All" ? true : emp.gender === gender;

    const statusMatch =
      status === "All"
        ? true
        : status === "Active"
        ? emp.active === true
        : emp.active === false;

    return searchMatch && genderMatch && statusMatch;
  });

  return (
    <div className="container py-4">
      <h2 className="fw-bold mb-3">Employee Management Dashboard</h2>

      {/* Summary should show filtered results */}
      <EmployeeSummary employees={filteredEmployees} />

      {/* Search + Filter */}
      <SearchFilter
        search={search}
        setSearch={setSearch}
        gender={gender}
        setGender={setGender}
        status={status}
        setStatus={setStatus}
      />

      {/*  Form uses full employees (so add/edit updates main data) */}
      <EmployeeForm
        employees={employees}
        setEmployees={setEmployees}
        editingEmployee={editingEmployee}
        setEditingEmployee={setEditingEmployee}
      />

      {/*  Employee List uses filteredEmployees */}
      <EmployeeList
        employees={filteredEmployees}
        setEmployees={setEmployees}
        setEditingEmployee={setEditingEmployee}
      />
    </div>
  );
};

export default Dashboard;




