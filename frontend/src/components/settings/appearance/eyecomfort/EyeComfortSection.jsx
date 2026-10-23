import { Eye } from "lucide-react";
import { RadioCard, RadioGroup } from "../../SettingsPanel";
import AppearanceHeader from  "../AppearanceHeader";
import { EYE_COMFORT_ICONS } from "../../../icons/eyeComfortIcons";
import { EYE_COMFORT_MODES } from "../../../../appearance/appearance";

// "Eye Comfort" card in Appearance settings: status pill + one tile per tint mode.
// The parent decides what happens on select (update state, show a toast).
export default function EyeComfortSection({ activeId, onSelect }) {
  // Falls back to "off" if the saved value is ever unknown, so one tile is always selected.
  const activeMode =
    EYE_COMFORT_MODES.find((m) => m.id === activeId) ?? EYE_COMFORT_MODES[0];
  const isActive = activeMode.id !== "off";

  return (
    <div>
      <AppearanceHeader
        icon={Eye}
        eyebrow="Ergonomics & Comfort"
        title="Eye Comfort"
        description="Engineered for marathon clarity. Soften high-energy screen glare and read with natural ease."
        aside={
          <span
            role="status"
            className={`rounded-full px-3 py-1 font-mono text-[11px] shrink-0 ${
              isActive
                ? "bg-(--status-warning-bg) text-(--status-warning)"
                : "bg-(--bg-surface-subtle) text-(--text-secondary)"
            }`}
          >
            {isActive ? `Active · ${activeMode.label}` : "Disabled"}
          </span>
        }
      />

      <div>
        {/* @container: the columns follow this block's width, not the window's */}
        <div className="@container">
          <RadioGroup
            label="Eye comfort mode"
            className="grid grid-cols-1 gap-3 @lg:grid-cols-2 @4xl:grid-cols-4"
          >
            {EYE_COMFORT_MODES.map((mode) => (
              <RadioCard
                key={mode.id}
                roving
                dotAlign="start"
                icon={EYE_COMFORT_ICONS[mode.id]}
                selected={mode.id === activeMode.id}
                onSelect={() => onSelect(mode)}
                title={
                  <>
                    {mode.label}
                    <span className="font-mono text-[10.5px] font-medium text-(--text-muted)">
                      {mode.detail}
                    </span>
                  </>
                }
                description={mode.description}
              />
            ))}
          </RadioGroup>
        </div>
      </div>
    </div>
  );
}
