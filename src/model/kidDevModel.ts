import { StatementCode } from "../constants/modelConstants";

export interface KDPencil {
  x: number;
  y: number;
  penX: number;
  penY: number;
  stroke: string;
  angle: number;
  rotate: number;
}

export interface KDCode {
  code: Array<KDCodeBlock>;
}

export interface KDCodeBlock {
  statements: Array<KDCodeStatement>;
}

export interface KDCodeStatement {
  id: string;
  name: StatementCode;
  coords?: Array<number>;
  stringValue?: string;
  numberValue?: number;
}