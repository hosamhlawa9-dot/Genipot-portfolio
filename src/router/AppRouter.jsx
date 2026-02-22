import { Routes, Route } from "react-router-dom";
import CreatorPage from "../pages/CreatorPage";

function AppRouter() {
  return (
    <Routes>
      <Route path="/creators/:id" element={<CreatorPage />} />
    </Routes>
  );
}

export default AppRouter;