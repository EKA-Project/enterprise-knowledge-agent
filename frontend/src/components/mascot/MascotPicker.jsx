import { RadioCard, RadioGroup } from "../settings/SettingsPanel";
import { MASCOTS, getMascotPreview } from "../../mascot/mascotRegistry";
import { useMascot } from "../../hooks/useMascot";
import useToast from "../../hooks/useToast"; // match the import style from check 0

export default function MascotPicker() {
  const { mascotId, setMascotId } = useMascot();
  const toast = useToast(); // match the call style from check 0

  const handleSelect = (mascot) => {
    if (mascot.id === mascotId) return; // already selected: no toast
    setMascotId(mascot.id); // saves to localStorage "eka.mascot"
    toast.success(`${mascot.name} is now your mascot`, {
      description: "You'll see it across EKA.",
      duration: 3000,
    });
  };

  return (
    // RadioGroup gives arrow-key navigation; `roving` on each card makes only the
    // selected one a Tab stop.
    <RadioGroup
      label="Mascot"
      className="grid grid-cols-1 gap-4 sm:grid-cols-2"
    >
      {MASCOTS.map((mascot) => (
        <RadioCard
          key={mascot.id}
          roving
          dotSide="left"
          selected={mascot.id === mascotId}
          onSelect={() => handleSelect(mascot)}
          image={getMascotPreview(mascot.id)}
          title={mascot.name}
          description={mascot.description}
        />
      ))}
    </RadioGroup>
  );
}