export const generateEmployeeId = (employees) => {
  if (!employees || employees.length === 0) return "EMP001";

  const ids = employees
    .map((emp) => emp.id)
    .filter((id) => typeof id === "string" && id.startsWith("EMP"))
    .map((id) => parseInt(id.replace("EMP", ""), 10))
    .filter((num) => !isNaN(num));

  const next = ids.length > 0 ? Math.max(...ids) + 1 : 1;

  return `EMP${String(next).padStart(3, "0")}`;
};
