import { StatementCode } from "./modelConstants";

export interface KDPencil {
  x: number;
  y: number;
  penX: number;
  penY: number;
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
  magnitude?: number;
}

export interface KDUserDescriptor {
  id: string;
  image: string;
  displayLevel: number;
}