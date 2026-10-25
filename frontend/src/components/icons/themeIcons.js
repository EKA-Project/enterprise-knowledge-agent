import {
  Anchor, Book, Citrus, Cloud, CloudMoon, Clover, Compass, Contrast, Crown,
  Diamond, Droplet, Eye, Feather, Flame, Flower2, Gauge, Gem, Grape, Leaf,
  Moon, Orbit, Palette, Sparkle, Sunrise, Sunset, TreePine, Wheat,
  Coffee, Flower, Hexagon, PenTool, Zap,
} from "lucide-react";
import ToriiIcon from "./ToriiIcon";

// theme id (from theme.js) -> icon component. To add a theme icon: one line here.
// Any id missing from this map falls back to Palette, so a new theme never shows a blank tile.
const THEME_ICONS = {
  // Oceanic & Sky
  "sky-blue": Cloud,
  "deep-sea": Anchor,
  "moonlight-ocean": Moon,
  "lagoon-glass": Droplet,
  "nordic-sunset": Sunset,
  "coastal-crimson": Compass,
  "cobalt-periwinkle": Hexagon,
  "jet-cerulean": Zap,
  // Editorial & Paper
  "sunlit-paper": Feather,
  "vintage-linen": Book,
  "washi-vermilion": ToriiIcon,
  "honey-oat": Wheat,
  mulberry: Grape,
  "circadian-amber": Eye,
  "mocha-lavender": Coffee,  
  // Botanical & Earth
  "citrus-studio": Citrus,
  "sage-mist": Leaf,
  "sea-glass": Gem,
  // Dusk & Pastels
  "soft-pastels": CloudMoon,
  "enchanted-forest": TreePine,
  "orchid-dusk": Flower2,
  "lilac-haze": Sparkle,
  "peach-dawn": Sunrise,
  "rose-quartz": Diamond,
  "aubergine-marigold": Flower,
  // Executive & Noir
  "executive-gold": Crown,
  "noir-expressionist": Contrast,
  "space-steel": Orbit,
  "midnight-copper": Flame,
  "rosso-corsa": Gauge,
  "pure-white-black": PenTool,
    "night-meadow": Clover,
};

export const getThemeIcon = (id) => THEME_ICONS[id] ?? Palette;