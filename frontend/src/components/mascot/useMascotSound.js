import { useSyncExternalStore } from "react";
import {
  isSoundOn,
  playMascotSound,
  setSoundOn,
  subscribeSound,
} from "../../mascot/mascotSound.js";
// const { soundOn, toggleSound } = useMascotSound();
// Every mascot on the page shares one setting, so toggling it in one place
// updates all of them.
function useMascotSound() {
  const soundOn = useSyncExternalStore(subscribeSound, isSoundOn);

  const toggleSound = () => {
    const next = !isSoundOn();
    setSoundOn(next);
    if (next) playMascotSound("happy"); // little chime to confirm the sound is back
  };

  return { soundOn, toggleSound };
}

export default useMascotSound;
