import type { CSSProperties } from "react";
import { Route, Routes } from "react-router-dom";

import { DesktopNavigation, MobileNavigation } from "./components/Navigation";
import { DashboardPage } from "./pages/Dashboard";
import { DatabaseEditorPage } from "./pages/DatabaseEditor";
import { MissionsPage } from "./pages/Missions";
import { RewardsPage } from "./pages/Rewards";

const headerStyle: CSSProperties = {
  display: "flex",
  justifyContent: "space-between",
  alignItems: "center",
  padding: "1.5rem",
  maxWidth: "960px",
  margin: "0 auto"
};

const brandStyle: CSSProperties = {
  fontWeight: 700,
  fontSize: "1.25rem"
};

const App = () => (
  <div>
    <header style={headerStyle}>
      <div>
        <span style={brandStyle}>Innerbloom</span>
        <p style={{ margin: "0.25rem 0 0", color: "#cbd5f5", fontSize: "0.9rem" }}>
          Gamification building blocks in one workspace.
        </p>
      </div>
      <DesktopNavigation />
    </header>
    <main>
      <Routes>
        <Route path="/" element={<DashboardPage />} />
        <Route path="/bbdd" element={<DatabaseEditorPage />} />
        <Route path="/missions" element={<MissionsPage />} />
        <Route path="/rewards" element={<RewardsPage />} />
      </Routes>
    </main>
    <MobileNavigation />
  </div>
);

export default App;
