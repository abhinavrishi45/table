import React, { useState } from "react";

const modulesList = [
  "Time / Energy Management",
  "Psychological Safety & Culture",
  "Resilience & Grit",
  "Leadership Skills",
  "Communication",
  "a", "b", "c", "d", "e", "f",
];

const thStyle = { border: "1px solid #ccc", padding: "10px", textAlign: "left" };
const tdStyle = { border: "1px solid #ccc", padding: "10px" };

const makeRow = (module, custom = false) => ({
  id: Date.now(),
  module,
  custom,
  mode: custom ? "" : "Online",
  participants: "",
  impact: "",
});

export default function TrainingTable() {
  const [rows, setRows] = useState([]);
  const [customInput, setCustomInput] = useState("");

  const addModule = (value) => {
    if (!value) return;
    if (rows.length >= 5) return alert("Max 5 modules allowed");
    if (rows.find(r => r.module === value)) return alert("Already added");
    setRows(prev => [...prev, makeRow(value)]);
  };

  const addCustom = () => {
    if (!customInput) return;
    if (rows.find(r => r.custom)) return alert("Only 1 custom allowed");
    setRows(prev => [...prev, makeRow(customInput, true)]);
    setCustomInput("");
  };

  const removeRow = (id) => setRows(rows.filter(r => r.id !== id));

  const updateRow = (id, field, value) =>
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));

  const onDragStart = (e, index) => {
    e.dataTransfer.setData("text/plain", String(index));
    e.dataTransfer.effectAllowed = "move";
  };

  const onDrop = (e, index) => {
    e.preventDefault();
    const from = parseInt(e.dataTransfer.getData("text/plain"), 10);
    if (isNaN(from)) return;
    const next = [...rows];
    next.splice(index, 0, next.splice(from, 1)[0]);
    setRows(next);
  };

  return (
    <div style={{ padding: 20 }}>

      {/* TOP SECTION */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>

        <div>
          <label>Standard Modules (Max 5)</label><br />
          <select
            value=""
            onChange={e => addModule(e.target.value)}
            style={{ padding: 8, width: 250, border: "1px solid #ccc", borderRadius: 6 }}
          >
            <option value=""> Select a Training Module </option>
            {modulesList.map(m => <option key={m} value={m}>{m}</option>)}
          </select>
        </div>

        <div>
          <label>Custom Module (Max 1)</label><br />
          <input
            value={customInput}
            onChange={e => setCustomInput(e.target.value)}
            placeholder="Type here..."
            style={{ padding: 8, border: "1px solid #ccc", borderRadius: 6 }}
          />
          <button onClick={addCustom} style={{ marginLeft: 5 }}>Add</button>
        </div>

      </div>

      {/* TABLE */}
      <table border="1" width="100%" style={{ borderCollapse: "collapse", border: "1px solid #ccc" }}>
        <thead style={{ background: "#1f3a6d", color: "white" }}>
          <tr>
            <th style={thStyle}>Priority</th>
            <th style={thStyle}>Module Name</th>
            <th style={thStyle}>Mode</th>
            <th style={thStyle}>Estimated Participants</th>
            <th style={thStyle}>Expected Impact / Comments</th>
          </tr>
        </thead>

        <tbody>
          {rows.map((row, index) => (
            <tr
              key={row.id}
              onDragOver={e => e.preventDefault()}
              onDrop={e => onDrop(e, index)}
            >
              <td
                style={{ ...tdStyle, cursor: "grab", width: 60, textAlign: "center" }}
                draggable
                onDragStart={e => onDragStart(e, index)}
                title="Drag to reorder"
              >
                {index + 1}
              </td>

              <td style={tdStyle}>
                {row.module}
                <span onClick={() => removeRow(row.id)} style={{ color: "red", marginLeft: 10, cursor: "pointer" }}>❌</span>
              </td>

              <td style={tdStyle}>
                <select
                  value={row.mode}
                  onChange={e => updateRow(row.id, "mode", e.target.value)}
                  style={{ padding: 6, border: "1px solid #ccc", borderRadius: 4 }}
                >
                  <option value="">Select</option>
                  <option value="Online">Online</option>
                  <option value="Classroom">Classroom</option>
                </select>
              </td>

              <td style={tdStyle}>
                <input
                  type="number"
                  value={row.participants}
                  onChange={e => updateRow(row.id, "participants", e.target.value)}
                  style={{ padding: 6, width: "100%", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: 4 }}
                />
              </td>

              <td style={tdStyle}>
                <input
                  value={row.impact}
                  onChange={e => updateRow(row.id, "impact", e.target.value)}
                  style={{ padding: 6, width: "100%", boxSizing: "border-box", border: "1px solid #ccc", borderRadius: 4 }}
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ textAlign: "center", marginTop: 10 }}>
        Drag and drop rows to re-order priority.
      </p>

      <button style={{ background: "green", color: "white", padding: "10px 20px", float: "right", marginTop: 10 }}>
        Submit Selections
      </button>

    </div>
  );
}