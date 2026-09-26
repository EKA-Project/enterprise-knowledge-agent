import { ArrowUpRight } from 'lucide-react';

// Maps each category's iconTheme (from knowledgeData.js) to its exact
// badge background + icon color, measured directly from the reference design.
const themeStyles = {
  mint: 'bg-green-100 text-green-700',
  lavender: 'bg-purple-100 text-purple-800',
  gold: 'bg-amber-100 text-amber-700',
  pink: 'bg-rose-100 text-rose-600',
  blue: 'bg-sky-100 text-sky-600',
  tan: 'bg-[#f2eadf] text-stone-600',
};

export default function CategoryCard({ category }) {
  const Icon = category.icon;

  return (
    <div className="rounded-3xl bg-white p-6 shadow-sm transition-shadow duration-200 hover:shadow-md">
      <div className="mb-6 flex items-start justify-between">
        <div className={`flex h-12 w-12 items-center justify-center rounded-2xl ${themeStyles[category.iconTheme]}`}>
          <Icon size={22} />
        </div>
        {/* Static "open topic" indicator — not an edit action */}
        <ArrowUpRight size={18} className="text-slate-900" />
      </div>

      <h3 className="kb-hero-heading text-xl font-bold text-slate-900">
        {category.title}
      </h3>
      <p className="mt-1 text-sm text-slate-500">
        {category.docCount} documents • {category.updatedLabel}
      </p>

      <button
        type="button"
        className="mt-6 text-sm text-slate-500 hover:text-slate-700"
      >
        Explore topic ›
      </button>
    </div>
  );
}