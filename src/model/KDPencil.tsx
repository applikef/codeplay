export const PENCIL_IMAGE = "./resources/pencil128 with arrow.png";
export const PENCIL_IMAGE_MAX_DIMENSION = 128;

export const DEFAULT_PENCIL: KDPencil = {
  x: 100,
  y: 100,
  penX: 162,
  penY: 216,
  stroke: "#0000ff",
  angle: 0,
  rotate: 0
}

export const DEFAULT_PENCIL_PEN_DELTA_X = 62;
export const DEFAULT_PENCIL_PEN_DELTA_Y = 116;

export interface KDPencil {
  x: number;
  y: number;
  penX: number;
  penY: number;
  stroke: string;
  angle: number;
  rotate: number;
}
