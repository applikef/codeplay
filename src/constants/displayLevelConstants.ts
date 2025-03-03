export enum DISPLAY_LEVEL {
  PENCIL_ONLY,
  JUMP_NO_ATTR,
  JUMP,
  RESET,
  DELETE_AND_JUMP_STATEMENT,
  JUMP_AND_COLORS_STMTS,
  STATEMENT_GROUPS,
  SET_STROKE_WITH_PARAMS,
  TURN_NO_ATTR,
  OTHER
}

export const DisplayLevelTitle = new Map<DISPLAY_LEVEL, string>([
  [DISPLAY_LEVEL.PENCIL_ONLY,'התחלה']
]);