import { StatementCode } from "../constants/modelConstants";
import { KDCodeStatement } from "./kidDevModel";

export class CodeValidator {
   public static isValid(s: KDCodeStatement): boolean {
    switch (s.name) {
      case StatementCode.JUMP:
        return CodeValidator.isValidJump(s.numberValue);
      case StatementCode.SET_STROKE:
        return CodeValidator.isValidSetStroke(s.stringValue); 
    }
  }

  public static isValidJump(value: number | undefined): boolean {
    if (value === undefined) {
      return false;
    }

    if (isNaN(value) || value <= 0) {
      return false;
    }
    return true;
  }

  public static isValidSetStroke(color: string | undefined): boolean {
    if (color === undefined) {
      return false;
    }
    
    if (color.substring(0,1) !== "#")
      return false;

    for (let i=1; i < color.length; i++) {
      if ("0123456789abcdef".indexOf(color.substring(i,i+1)) === -1)
        return false;
    }
    return true;
  }
}