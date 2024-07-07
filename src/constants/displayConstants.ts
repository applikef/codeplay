import { KDPencil } from "../model/kidDevModel";

export const DISPLAY_AREA_WIDTH = 800; 
export const DISPLAY_AREA_HEIGHT = 600; 

export const DEFAULT_PENCIL_POSITION: KDPencil = {
  x: 100,
  y: 100,
  penX: 162,
  penY: 216
}

export const DEFAULT_PENCIL_PEN_DELTA_X = 62;
export const DEFAULT_PENCIL_PEN_DELTA_Y = 116;

export const StrokeColors: Array<string> = [
  "RED",
  "GREEN",
  "BLUE",
  "MAGENTA",
  "CYAN",
  "ORANGE",
  "BLACK"
]

export const StrokeColorsHex = new Map<string, string>([
  ["RED", "#ff0000"],
  ["GREEN", "#00ff00"],
  ["BLUE", "#0000ff"],
  ["MAGENTA", "#ff00ff"],
  ["CYAN", "#00ffff"],
  ["ORANGE", "#ff7400"],
  ["BLACK", "#000000"]
]);