// src/components/ScreenTable.tsx
import React, { useState } from "react";
import type { Screen } from "../api/screensApi";

type Props = {
  items: Screen[];
  onToggle: (id: string, isActive: boolean) => Promise<any> | void;
};

/**
 * ScreenTable
 * - Renders a simple accessible table of screens
 * - Shows a per-row loading state when toggle is in-flight
 */
export default function ScreenTable({ items, onToggle }: Props) {
  // track loading state per-row to disable actions and show spinner/text if needed
  const [loadingMap, setLoadingMap] = useState<Record<string, boolean>>({});

  const setLoading = (id: string, v: boolean) =>
    setLoadingMap((m) => ({ ...m, [id]: v }));

  const handleToggle = async (id: string, nextValue: boolean) => {
    try {
      setLoading(id, true);
      // Allow onToggle to be sync or return a promise
      const result = onToggle(id, nextValue);
      if (result && typeof (result as Promise<any>).then === "function") {
        await result;
      }
    } finally {
      setLoading(id, false);
    }
  };

  return (
    <div>
      {items.length === 0 ? (
        <div role="status" aria-live="polite">
          No screens found.
        </div>
      ) : (
        <table
          style={{ width: "100%", borderCollapse: "collapse" }}
          aria-describedby="screens-desc"
        >
          <caption
            id="screens-desc"
            style={{ textAlign: "left", marginBottom: 8 }}
          >
            List of screens — toggle to activate or deactivate. Changes are
            optimistic.
          </caption>
          <thead>
            <tr>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px 4px",
                  borderBottom: "1px solid #e6e6e6",
                }}
              >
                Name
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px 4px",
                  borderBottom: "1px solid #e6e6e6",
                }}
              >
                Active
              </th>
              <th
                style={{
                  textAlign: "left",
                  padding: "8px 4px",
                  borderBottom: "1px solid #e6e6e6",
                }}
              >
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {items.map((s) => {
              const isLoading = !!loadingMap[s._id];
              return (
                <tr key={s._id}>
                  <td style={{ padding: "10px 4px", verticalAlign: "middle" }}>
                    {s.name}
                  </td>
                  <td
                    style={{ padding: "10px 4px", verticalAlign: "middle" }}
                  ></td>
                  <td style={{ padding: "10px 4px", verticalAlign: "middle" }}>
                    {isLoading ? (
                      <span aria-live="polite">Saving...</span>
                    ) : (
                      <button
                        onClick={() => {
                          // Example extra action: quick deactivate/reactivate
                          handleToggle(s._id, !s.isActive);
                        }}
                        aria-label={
                          s.isActive
                            ? `Deactivate ${s.name}`
                            : `Activate ${s.name}`
                        }
                      >
                        {s.isActive ? "Deactivate" : "Activate"}
                      </button>
                    )}
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      )}
    </div>
  );
}
