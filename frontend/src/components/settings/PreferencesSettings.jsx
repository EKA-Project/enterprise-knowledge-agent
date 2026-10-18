import SettingsPanel, {
  RadioCard,
  SettingRow,
  SubSection,
} from "./SettingsPanel";
import { Select } from "../common/Input";
import Checkbox from "../common/Checkbox";
import { LANGUAGES } from "./settingsConfig";

const answerStyles = [
  [
    "concise",
    "Concise & Direct",
    "Bullet-point summaries, quick metrics, and direct links to policies.",
  ],
  [
    "detailed",
    "Detailed & Thorough",
    "Complete background context, clause citations, and multi-step walkthroughs.",
  ],
];

export default function PreferencesSettings({ settings, update }) {
  return (
    <SettingsPanel
      title="EKA Preferences"
      description="Customize how EKA synthesizes knowledge and assists your daily workflow."
    >
      <SubSection
        first
        title="Answer Style"
        description="Choose how EKA presents its answers to your questions."
      >
        <div
          role="radiogroup"
          aria-label="Answer style"
          className="grid grid-cols-1 gap-4 sm:grid-cols-2"
        >
          {answerStyles.map(([id, name, description]) => (
            <RadioCard
              key={id}
              dotSide="left"
              selected={settings.answerStyle === id}
              onSelect={() => update({ answerStyle: id })}
              title={name}
              description={description}
            />
          ))}
        </div>
      </SubSection>

      <SubSection
        title="Language"
        description="Choose your preferred language for EKA responses."
      >
        <Select
          className="max-w-[360px]"
          aria-label="Language"
          value={settings.language}
          onChange={(e) => update({ language: e.target.value })}
          helper="EKA translates answers while referencing the original English policy documents."
        >
          {LANGUAGES.map((language) => (
            <option key={language} value={language}>
              {language}
            </option>
          ))}
        </Select>

        <div className="mt-6">
          <SettingRow
            title="Recommended Questions"
            description="Suggest 3 contextual follow-up questions below each query answer."
          >
            <Checkbox
              label="Recommended questions"
              checked={settings.recommended}
              onChange={(value) => update({ recommended: value })}
            />
          </SettingRow>
        </div>
      </SubSection>
    </SettingsPanel>
  );
}