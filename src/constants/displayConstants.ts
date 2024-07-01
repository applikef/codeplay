import { KDPencil } from "../model/kidDevModel";

export const DEFAULT_PENCIL_POSITION: KDPencil = {
  x: 100,
  y: 100,
  penX: 162,
  penY: 216
}

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