import PageHero from "../../common/PageHero.jsx";
import pageMetadata from "../../../config/pageMetadata.js";

function AdminOverview() {
  const hero = pageMetadata.dashboard.admin;

  return (
    <div className="min-h-full p-10">
      <PageHero
        eyebrow={hero.eyebrow}
        title={hero.title}
        description={hero.description}
        status={hero.status}
      />
    </div>
  );
}

export default AdminOverview;