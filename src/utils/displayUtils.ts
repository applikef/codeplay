import { KD_APP_STRINGS } from "../constants/appStrings";
import { StatementCode } from "../constants/modelConstants";

export function getTurnStatementIcon(statementName: StatementCode): string {
  const imageSrc = statementName === StatementCode.TURN_DOWN ?
    "resources/statementIcons/turnDown32.png"
  : statementName === StatementCode.TURN_UP ?
    "resources/statementIcons/turnUp32.png"
  : statementName === StatementCode.TURN_RIGHT ?
    "resources/statementIcons/turnRight32.png"
  : statementName === StatementCode.TURN_LEFT ?
    "resources/statementIcons/turnLeft32.png"
  : "resources/statementIcons/turn32.png";

  return imageSrc;
}

export function getTurnStatementTitle(statementName: StatementCode):string {
  const title = statementName === StatementCode.TURN_DOWN ?
    KD_APP_STRINGS.TURN_DOWN
  : statementName === StatementCode.TURN_UP ?
  KD_APP_STRINGS.TURN_UP
  : statementName === StatementCode.TURN_RIGHT ?
  KD_APP_STRINGS.TURN_RIGHT
  : statementName === StatementCode.TURN_LEFT ?
  KD_APP_STRINGS.TURN_LEFT
  : KD_APP_STRINGS.TURN;

  return title;
}
