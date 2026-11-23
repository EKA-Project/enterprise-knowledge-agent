import { useSyncExternalStore } from "react";
import {
  getVolume,
  isSoundOn,
  playMascotSound,
  setSoundOn,
  setVolume,
  subscribeSound,
} from "../../mascot/mascotSound.js";
// const { soundOn, toggleSound, volume, setVolume } = useMascotSound();
// volume is a number from 0 to 1.
// Every mascot on the page shares one setting, so toggling it in one place
// updates all of them.
function useMascotSound() {
  const soundOn = useSyncExternalStore(subscribeSound, isSoundOn);
  const volume = useSyncExternalStore(subscribeSound, getVolume);

  const toggleSound = () => {
    const next = !isSoundOn();
    setSoundOn(next);
    if (next) playMascotSound("happy"); // little chime to confirm the sound is back
  };

  return { soundOn, toggleSound, volume, setVolume };
}

export default useMascotSound;
