import React, { useState } from "react";
import { useScreens, useToggleScreen } from "../../hooks/useScreens";
import ScreenTable from "../../components/ScreenTable";

export default function ScreensPage() {
  const [search, setSearch] = useState("");
  const [page, setPage] = useState(1);

  const { data, isLoading } = useScreens(search, page, 10);
  const toggleMutation = useToggleScreen();

  return (
    <main style={{ padding: 24 }}>
      <h1>Screens</h1>
      <div>
        <input
          placeholder="Search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {isLoading ? (
        <div>Loading...</div>
      ) : (
        <ScreenTable
          items={data?.items || []}
          onToggle={(id, isActive) => toggleMutation.mutate({ id, isActive })}
        />
      )}

      <div style={{ marginTop: 12 }}>
        <button onClick={() => setPage((p) => Math.max(1, p - 1))}>Prev</button>
        <span style={{ margin: "0 8px" }}>{page}</span>
        <button onClick={() => setPage((p) => p + 1)}>Next</button>
      </div>
    </main>
  );
}
