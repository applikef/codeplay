export const enum DISPLAY_LEVEL {
  PENCIL_ONLY,
  JUMP_NO_ATTR,
  JUMP_READ_ONLY,
  JUMP,
  RESET,
  COLORS_STMTS,
  STATEMENT_GROUPS,
  OTHER
}

export const DisplayLevelTitle = new Map<DISPLAY_LEVEL, string>([
  [DISPLAY_LEVEL.PENCIL_ONLY,'התחלה']
]);