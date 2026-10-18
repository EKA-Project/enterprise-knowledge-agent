import SettingsPanel, { RadioCard, SettingRow, SubSection } from "./SettingsPanel";
import { Select } from "../common/Input";
import Checkbox from "../common/Checkbox";
import { LANGUAGES } from "./settingsConfig";
import orbitIdle from "../../assets/images/orbit/idle.png";
import byteIdle from "../../assets/images/byte/idle.png";
// ↑ CHECK these two paths. Your screenshot showed the byte and orbit folders but not their parent.

export default function PreferencesSettings({ settings, update }) {
  const mascots = [
    ["orbit", "Orbit", "Smooth and friendly", orbitIdle],
    ["byte", "Byte", "Retro pixel vibes", byteIdle],
  ];
  const styles = [
    ["concise", "Concise & Direct", "Bullet-point summaries, quick metrics, and direct links to policies."],
    ["detailed", "Detailed & Thorough", "Complete background context, clause citations, and multi-step walkthroughs."],
  ];

  return (
    <SettingsPanel title="EKA Preferences" description="Customize how EKA synthesizes knowledge and assists your daily workflow.">
      <SubSection first title="Companion Mascot" description="Choose who keeps you company across EKA.">
        <div role="radiogroup" aria-label="Companion mascot" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {mascots.map(([id, name, text, img]) => (
            <RadioCard key={id} selected={settings.mascot === id} onSelect={() => update({ mascot: id })} title={name} badge="Active" description={text} image={img} />
          ))}
        </div>
      </SubSection>

      <SubSection title="Answer Style" description="Select whether AI responses should prioritize brevity or deep explanatory context.">
        <div role="radiogroup" aria-label="Answer style" className="grid grid-cols-1 gap-4 sm:grid-cols-2">
          {styles.map(([id, name, text]) => (
            <RadioCard key={id} dotSide="left" selected={settings.answerStyle === id} onSelect={() => update({ answerStyle: id })} title={name} description={text} />
          ))}
        </div>
      </SubSection>

      <SubSection title="Language">
        <Select className="max-w-[360px]" aria-label="Language" value={settings.language} onChange={(e) => update({ language: e.target.value })} helper="EKA translates answers while referencing the original English policy documents.">
          {LANGUAGES.map((l) => <option key={l}>{l}</option>)}
        </Select>
        <div className="mt-6">
          <SettingRow title="Recommended Questions" description="Suggest 3 contextual follow-up questions below each query answer">
            <Checkbox label="Recommended questions" checked={settings.recommended} onChange={(v) => update({ recommended: v })} />
          </SettingRow>
        </div>
      </SubSection>
    </SettingsPanel>
  );
}