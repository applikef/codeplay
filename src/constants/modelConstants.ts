export enum StatementCode {
  JUMP,
  SET_STROKE
}

export const StatementTitle = new Map<StatementCode, string>([
  [StatementCode.JUMP,'התקדם'],
  [StatementCode.SET_STROKE,'צבע עפרון']
]);

export const MagnitudeTitle = new Map<StatementCode, string>([
  [StatementCode.JUMP,'צעדים']
]);

export const DefaultMagnitude = new Map<StatementCode, number>([
  [StatementCode.JUMP,50]
]);

export const DefaultStringValue = new Map<StatementCode, string>([
  [StatementCode.SET_STROKE,"#00ff00"]
]);



