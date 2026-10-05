import { Link } from "react-router-dom";

import PageHero from "../../common/PageHero.jsx";

import pageMetadata from "../../../config/pageMetadata.js";
function EmployeeOverview() {
  // ─────────────────────────────────────────────
  // Page metadata
  // ─────────────────────────────────────────────

  const hero = pageMetadata.dashboard.employee;

  // ─────────────────────────────────────────────
  // Render
  // ─────────────────────────────────────────────

  return (
    <div classname="min-h-full">
      {/* ─────────────────────────────────────────
          Hero section
      ───────────────────────────────────────── */}
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        status={hero.status}
      />
    </div>
  );
}

export default EmployeeOverview;
