import React, { useState } from "react";

const modulesList = [
  "Time / Energy Management",
  "Psychological Safety & Culture",
  "Resilience & Grit",
  "Leadership Skills",
  "Communication"
];

export default function TrainingTable() {
  const [rows, setRows] = useState([]);
  const [selectedModule, setSelectedModule] = useState("");
  const [customInput, setCustomInput] = useState("");

  // ✅ Add Standard Module
  const addModule = () => {
    if (!selectedModule) return;

    if (rows.length >= 5) {
      alert("Max 5 allowed");
      return;
    }

    if (rows.find(r => r.module === selectedModule)) {
      alert("Already added");
      return;
    }

    setRows([
      ...rows,
      {
        id: Date.now(),
        module: selectedModule,
        mode: "Online",
        participants: "",
        impact: ""
      }
    ]);

    setSelectedModule("");
  };

  // ✅ Add Custom Module
  const addCustom = () => {
    if (!customInput) return;

    if (rows.find(r => r.custom)) {
      alert("Only 1 custom allowed");
      return;
    }

    setRows([
      ...rows,
      {
        id: Date.now(),
        module: customInput,
        custom: true,
        mode: "",
        participants: "",
        impact: ""
      }
    ]);

    setCustomInput("");
  };
  const thStyle = {
    border: "1px solid #ccc",
    padding: "10px",
    textAlign: "left"
  };

  const tdStyle = {
    border: "1px solid #ccc",
    padding: "10px"
  };

  // ✅ Delete
  const removeRow = (id) => {
    setRows(rows.filter(r => r.id !== id));
  };

  // ✅ Update Cell
  const updateRow = (id, field, value) => {
    setRows(rows.map(r => r.id === id ? { ...r, [field]: value } : r));
  };

  // ✅ Drag
  const onDragStart = (e, index) => {
    e.dataTransfer.setData("index", index);
  };

  const onDrop = (e, index) => {
    const draggedIndex = e.dataTransfer.getData("index");
    const newRows = [...rows];
    const draggedItem = newRows[draggedIndex];

    newRows.splice(draggedIndex, 1);
    newRows.splice(index, 0, draggedItem);

    setRows(newRows);
  };

  return (
    <div style={{ padding: 20 }}>

      {/* 🔹 TOP SECTION */}
      <div style={{ display: "flex", gap: 10, marginBottom: 20 }}>

        <div>
          <label>Standard Modules (Max 5)</label><br />
          <select
            value=""
            onChange={(e) => {
              const value = e.target.value;
              if (!value) return;

              // Max 5 check
              if (rows.length >= 5) {
                alert("Max 5 modules allowed");
                return;
              }

              // Duplicate check
              if (rows.find(r => r.module === value)) {
                alert("Already added");
                return;
              }

              // Add row
              setRows(prev => [
                ...prev,
                {
                  id: Date.now(),
                  module: value,
                  mode: "Online",
                  participants: "",
                  impact: ""
                }
              ]);
            }}
            style={{ padding: 8, width: 250 }}
          >
            <option value="">-- Select a Training Module --</option>
            {modulesList.map(m => (
              <option key={m} value={m}>{m}</option>
            ))}
          </select>
          <button onClick={addModule} style={{ marginLeft: 5 }}>+</button>
        </div>

        <div>
          <label>Custom Module (Max 1)</label><br />
          <input
            value={customInput}
            onChange={(e) => setCustomInput(e.target.value)}
            placeholder="Type here..."
            style={{ padding: 8 }}
          />
          <button onClick={addCustom} style={{ marginLeft: 5 }}>Add</button>
        </div>

      </div>

      {/* 🔹 TABLE */}
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
            <tr key={row.id}>
              <td style={tdStyle}>{index + 1}</td>

              <td style={tdStyle}>
                {row.module}
                <span
                  onClick={() => removeRow(row.id)}
                  style={{ color: "red", marginLeft: 10, cursor: "pointer" }}
                >
                  ❌
                </span>
              </td>

              <td style={tdStyle}>
                <select
                  value={row.mode}
                  onChange={(e) => updateRow(row.id, "mode", e.target.value)}
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
                  onChange={(e) =>
                    updateRow(row.id, "participants", e.target.value)
                  }
                />
              </td>

              <td style={tdStyle}>
                <input
                  value={row.impact}
                  onChange={(e) =>
                    updateRow(row.id, "impact", e.target.value)
                  }
                />
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      <p style={{ textAlign: "center", marginTop: 10 }}>
        Drag and drop rows to re-order priority.
      </p>

      <button
        style={{
          background: "green",
          color: "white",
          padding: "10px 20px",
          float: "right",
          marginTop: 10
        }}
      >
        Submit Selections
      </button>
    </div>
  );
}