import React from "react";
import maleAvatar from "../../assets/male-avatar.jpg";
import femaleAvatar from "../../assets/female-avatar.png";

const EmployeeList = ({ employees, setEmployees, setEditingEmployee }) => {
  // Toggle Active/Inactive
  const handleToggleStatus = (id) => {
    setEmployees(
      employees.map((emp) =>
        emp.id === id ? { ...emp, active: !emp.active } : emp
      )
    );
  };

  //  Delete with confirmation
  const handleDelete = (id) => {
    if (window.confirm("Are you sure you want to delete this employee?")) {
      setEmployees((prev) => prev.filter((emp) => emp.id !== id));
    }
  };

  // Format DOB (YYYY-MM-DD -> DD MMM YYYY)
  const formatDOB = (dob) => {
    if (!dob) return "-";
    return new Date(dob).toLocaleDateString("en-IN", {
      day: "2-digit",
      month: "short",
      year: "numeric",
    });
  };

  // Get Profile Image (Uploaded or Gender avatar)
  const getProfileImage = (emp) => {
    if (emp.image) return emp.image;
    return emp.gender === "Female" ? femaleAvatar : maleAvatar;
  };

  //  Print employee (No placeholder URL)
  const handlePrint = (employee) => {
    const profileImg = getProfileImage(employee);
    const printWindow = window.open("", "_blank");

    printWindow.document.write(`
      <html>
        <head>
          <title>Print Employee</title>
          <style>
            body { font-family: Arial; padding: 20px; }
            .box { border: 1px solid #ddd; padding: 20px; border-radius: 10px; width: 350px; }
            img { width: 100px; height: 100px; border-radius: 50%; object-fit: cover; margin-bottom: 10px; }
            h2 { margin: 10px 0; }
            p { margin: 5px 0; }
          </style>
        </head>
        <body>
          <div class="box">
            <img src="${profileImg}" />
            <h2>${employee.name}</h2>
            <p><b>ID:</b> ${employee.id}</p>
            <p><b>Gender:</b> ${employee.gender}</p>
            <p><b>DOB:</b> ${formatDOB(employee.dob)}</p>
            <p><b>State:</b> ${employee.state}</p>
            <p><b>Status:</b> ${employee.active ? "Active" : "Inactive"}</p>
          </div>
        </body>
      </html>
    `);

    printWindow.document.close();
    printWindow.print();
  };

  //  Empty state (Only one place)
  if (employees.length === 0) {
    return (
      <div className="text-center my-4 p-4 border border-2 border-secondary border-opacity-25 rounded bg-white shadow-sm">
        <h5 className="fw-bold mb-1">No employees found</h5>
        <p className="text-muted mb-0">Try changing search or filters.</p>
      </div>
    );
  }

  return (
    <div className="mt-4">
      <h4 className="mb-3 fw-bold">Employee List</h4>

      <div className="table-responsive">
        <table className="table table-bordered table-hover align-middle text-center">
          <thead className="table-dark">
            <tr>
              <th style={{ minWidth: "120px" }}>Employee ID</th>
              <th style={{ minWidth: "120px" }}>Profile Image</th>
              <th style={{ minWidth: "180px" }}>Full Name</th>
              <th style={{ minWidth: "100px" }}>Gender</th>
              <th style={{ minWidth: "140px" }}>DOB</th>
              <th style={{ minWidth: "140px" }}>State</th>
              <th style={{ minWidth: "180px" }}>Active / Inactive</th>
              <th style={{ minWidth: "220px" }}>Actions</th>
            </tr>
          </thead>

          <tbody>
            {employees.map((emp) => (
              <tr key={emp.id}>
                {/* Employee ID */}
                <td className="fw-semibold">{emp.id}</td>

                {/*  Profile Image */}
                <td>
                  <img
                    src={getProfileImage(emp)}
                    alt="profile"
                    style={{
                      width: "55px",
                      height: "55px",
                      borderRadius: "50%",
                      objectFit: "cover",
                      border: "2px solid #ddd",
                    }}
                  />
                </td>

                {/* Full Name */}
                <td className="text-start px-3 fw-semibold">{emp.name}</td>

                {/*  Gender */}
                <td>{emp.gender}</td>

                {/*  DOB */}
                <td style={{ whiteSpace: "nowrap" }}>{formatDOB(emp.dob)}</td>

                {/*  State */}
                <td>{emp.state || "-"}</td>

                {/* Toggle */}
                <td>
                  <div className="d-flex justify-content-center align-items-center gap-2">
                    <div className="form-check form-switch m-0">
                      <input
                        className="form-check-input"
                        type="checkbox"
                        checked={emp.active}
                        onChange={() => handleToggleStatus(emp.id)}
                      />
                    </div>
                    <span
                      className={`badge ${
                        emp.active ? "bg-success" : "bg-secondary"
                      }`}
                    >
                      {emp.active ? "Active" : "Inactive"}
                    </span>
                  </div>
                </td>

                {/* Actions */}
                <td>
                  <div className="d-flex flex-wrap justify-content-center gap-2">
                    <button
                      className="btn btn-warning btn-sm"
                      onClick={() => setEditingEmployee(emp)}
                    >
                      Edit
                    </button>

                    <button
                      className="btn btn-danger btn-sm"
                      onClick={() => handleDelete(emp.id)}
                    >
                      Delete
                    </button>

                    <button
                      className="btn btn-secondary btn-sm"
                      onClick={() => handlePrint(emp)}
                    >
                      Print
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default EmployeeList;


