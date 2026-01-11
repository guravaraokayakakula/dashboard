import React from "react";

const EmployeeSummary = ({ employees }) => {
  const totalEmployees = employees.length;
  const activeEmployees = employees.filter(emp => emp.active).length;
  const inactiveEmployees = totalEmployees - activeEmployees;

  return (
    <div className="row my-4">
      {/* Total Employees */}
      <div className="col-md-4">
        <div className="card shadow-sm border-0">
          <div className="card-body bg-info text-white rounded">
            <h6>Total Employees</h6>
            <h3>{totalEmployees}</h3>
          </div>
        </div>
      </div>

      {/* Active Employees */}
      <div className="col-md-4">
        <div className="card shadow-sm border-0">
          <div className="card-body bg-success text-white rounded">
            <h6>Active Employees</h6>
            <h3>{activeEmployees}</h3>
          </div>
        </div>
      </div>

      {/* Inactive Employees (Bonus) */}
      <div className="col-md-4">
        <div className="card shadow-sm border-0">
          <div className="card-body bg-secondary text-white rounded">
            <h6>Inactive Employees</h6>
            <h3>{inactiveEmployees}</h3>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EmployeeSummary;

