import React from "react";

const SearchFilter = ({
  search,
  setSearch,
  gender,
  setGender,
  status,
  setStatus,
}) => {
  const handleReset = () => {
    setSearch("");
    setGender("All");
    setStatus("All");
  };

  return (
    <div className="card shadow-sm border-0 p-3 my-3">
      <div className="row g-3 align-items-end">
        {/* Search */}
        <div className="col-md-5">
          <label className="form-label fw-semibold">Search by Name</label>
          <input
            type="text"
            className="form-control"
            placeholder="Type employee name..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
          />
        </div>

        {/* Gender Filter */}
        <div className="col-md-3">
          <label className="form-label fw-semibold">Filter by Gender</label>
          <select
            className="form-select"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Male">Male</option>
            <option value="Female">Female</option>
          </select>
        </div>

        {/* Status Filter */}
        <div className="col-md-3">
          <label className="form-label fw-semibold">Filter by Status</label>
          <select
            className="form-select"
            value={status}
            onChange={(e) => setStatus(e.target.value)}
          >
            <option value="All">All</option>
            <option value="Active">Active</option>
            <option value="Inactive">Inactive</option>
          </select>
        </div>

        {/* Reset Icon */}
        <div className="col-md-1 d-grid">
          <button
            type="button"          //  FIX
            className="btn btn-dark"
            title="Reset filters"
            onClick={handleReset}
          >
            ↺
          </button>
        </div>
      </div>
    </div>
  );
};

export default SearchFilter;


