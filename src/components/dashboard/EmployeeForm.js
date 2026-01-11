import React, { useEffect, useRef, useState } from "react";
import { generateEmployeeId } from "../utils/generateEmployeeId";

const EmployeeForm = ({
  employees,
  setEmployees,
  editingEmployee,
  setEditingEmployee
}) => {
  const initialForm = {
    id: "",
    name: "",
    gender: "",
    dob: "",
    state: "",
    active: true,
    image: ""
  };

  const [form, setForm] = useState(initialForm);
  const [preview, setPreview] = useState("");
  const [errors, setErrors] = useState({});
  const fileInputRef = useRef(null);

  useEffect(() => {
    if (editingEmployee) {
      setForm(editingEmployee);
      setPreview(editingEmployee.image || "");
    }
  }, [editingEmployee]);

  const validateForm = () => {
    const newErrors = {};
    if (!form.name.trim()) newErrors.name = "Full Name is required";
    if (!form.gender) newErrors.gender = "Gender is required";
    if (!form.dob) newErrors.dob = "DOB is required";
    if (!form.state) newErrors.state = "State is required";
    if (!form.image) newErrors.image = "Profile image is required";

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleImageUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    if (!file.type.startsWith("image/")) {
      alert("Upload image only");
      return;
    }

    const reader = new FileReader();
    reader.onloadend = () => {
      setForm({ ...form, image: reader.result });
      setPreview(reader.result);
      setErrors((prev) => ({ ...prev, image: "" }));
    };
    reader.readAsDataURL(file);
  };

  const handleReset = () => {
  setForm(initialForm);
  setPreview("");
  setErrors({});
  setEditingEmployee(null);

  if (fileInputRef.current) {
    fileInputRef.current.value = "";
  }
};


  const handleSubmit = (e) => {
    e.preventDefault();
    if (!validateForm()) return;

    if (editingEmployee) {
      setEmployees((prev) =>
        prev.map((emp) => (emp.id === form.id ? form : emp))
      );
      setEditingEmployee(null); // after update go to add mode
    } else {
      setEmployees((prev) => [
        ...prev,
        { ...form, id: generateEmployeeId(employees) }
      ]);
    }

    handleReset();
  };

  return (
    <div className="card shadow-sm border-0 p-4 my-4">
      <div className="d-flex justify-content-between align-items-center mb-3">
        <h4 className="fw-bold m-0">{editingEmployee ? "Edit Employee" : "Add Employee"}</h4>

        {editingEmployee && (
          <button
            type="button"
            className="btn btn-outline-secondary btn-sm"
            onClick={handleReset}
          >
            Cancel
          </button>
        )}
      </div>

      <form onSubmit={handleSubmit}>
        <div className="row g-3">
          <div className="col-md-6">
            <label className="form-label fw-semibold">Full Name</label>
            <input
              type="text"
              className={`form-control ${errors.name ? "is-invalid" : ""}`}
              placeholder="Enter full name"
              value={form.name}
              onChange={(e) => setForm({ ...form, name: e.target.value })}
            />
            {errors.name && <div className="invalid-feedback">{errors.name}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Gender</label>
            <select
              className={`form-select ${errors.gender ? "is-invalid" : ""}`}
              value={form.gender}
              onChange={(e) => setForm({ ...form, gender: e.target.value })}
            >
              <option value="">Select Gender</option>
              <option value="Male">Male</option>
              <option value="Female">Female</option>
            </select>
            {errors.gender && <div className="invalid-feedback">{errors.gender}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">DOB</label>
            <input
              type="date"
              className={`form-control ${errors.dob ? "is-invalid" : ""}`}
              value={form.dob}
              onChange={(e) => setForm({ ...form, dob: e.target.value })}
            />
            {errors.dob && <div className="invalid-feedback">{errors.dob}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">State</label>
            <select
              className={`form-select ${errors.state ? "is-invalid" : ""}`}
              value={form.state}
              onChange={(e) => setForm({ ...form, state: e.target.value })}
            >
              <option value="">Select State</option>
              <option value="Hyderabad">Hyderabad</option>
              <option value="Delhi">Delhi</option>
              <option value="Mumbai">Mumbai</option>
              <option value="Maharashtra">Maharashtra</option>
              <option value="Karnataka">Karnataka</option>
            </select>
            {errors.state && <div className="invalid-feedback">{errors.state}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold">Profile Image</label>
            <input
              type="file"
              ref={fileInputRef}
              className={`form-control ${errors.image ? "is-invalid" : ""}`}
              accept="image/*"
              onChange={handleImageUpload}
            />
            {errors.image && <div className="invalid-feedback">{errors.image}</div>}
          </div>

          <div className="col-md-6">
            <label className="form-label fw-semibold d-block">Active / Inactive</label>
            <div className="form-check form-switch mt-2">
              <input
                className="form-check-input"
                type="checkbox"
                checked={form.active}
                onChange={() => setForm({ ...form, active: !form.active })}
              />
              <label className="form-check-label">
                {form.active ? "Active" : "Inactive"}
              </label>
            </div>
          </div>

          {preview && (
            <div className="col-12 text-center">
              <p className="fw-semibold mb-2">Image Preview</p>
              <img
                src={preview}
                alt="preview"
                style={{
                  width: 120,
                  height: 120,
                  borderRadius: "50%",
                  objectFit: "cover",
                  border: "2px solid #ddd"
                }}
              />
            </div>
          )}

          <div className="col-12 mt-3">
            <div className="d-flex gap-2">
              <button type="submit" className="btn btn-success w-50">
                {editingEmployee ? "Update" : "Add Employee"}
              </button>
              <button type="button" className="btn btn-secondary w-50" onClick={handleReset}>
                Reset
              </button>
            </div>
          </div>
        </div>
      </form>
    </div>
  );
};

export default EmployeeForm;
