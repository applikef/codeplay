import { StatementCode } from "../constants/modelConstants";
import { KDContextType } from "./KDContext";
import { KDCode, KDCodeBlock, KDCodeStatement, KDPencil } from "./kidDevModel";
import { DefaultNumberValue, DefaultStringValue } from "./../constants/modelConstants";
import { DEFAULT_PENCIL_PEN_DELTA_X, DEFAULT_PENCIL_PEN_DELTA_Y, DEFAULT_PENCIL_POSITION } from "../constants/displayConstants";
import { showError } from "../utils/errorsUtil";
import { KD_APP_ERROR_MESSAGES } from "../constants/appErrorMessages";
import { CodeValidator } from "./CodeValidator";

export class CodeInterpreter { 
  private displayLevel: number;
  private code: KDCode;

  constructor(context: KDContextType) {
    this.displayLevel = context.displayLevel;
    this.code = context.code;
  }

  private SVG_NS = 'http://www.w3.org/2000/svg';
  private pencil:KDPencil = DEFAULT_PENCIL_POSITION;
  private stroke: string = "#0000ff";

  private setPencil(penX: number, penY: number) {
    this.pencil = {
      x: penX - DEFAULT_PENCIL_PEN_DELTA_X,
      y: penY - DEFAULT_PENCIL_PEN_DELTA_Y,
      penX: penX,
      penY: penY
    };
  }

  public reset() {
    const svg: SVGElement = document.querySelector("svg")!;
    while (svg !== null && svg.lastChild) {
      svg.removeChild(svg.lastChild);
    }

    var newPencil = document.createElementNS(this.SVG_NS,'image');
    newPencil.setAttribute('id', 'pencil');
    newPencil.setAttribute('href', "./resources/pencil128.png");
    newPencil.setAttribute('x', '100');
    newPencil.setAttribute('y', '100');
    svg.append(newPencil);
    
    this.setPencil(162,216);
  }

  public execute() {
    if (this.displayLevel === 0) {
      return;
    }

    let stopExecution: boolean = false;
    for (let i=0; (!stopExecution && i < this.code.code.length); i++) {
      const blockStatements: Array<KDCodeStatement> = this.code.code[i].statements;
      for (let j=0; j < blockStatements.length; j++) {
        const statement: KDCodeStatement = blockStatements[j];
        if (CodeValidator.isValid(statement)) {
          this.executeStatement(statement,i);
        }
        else {
          showError(KD_APP_ERROR_MESSAGES.FIX_ERRORS);
          stopExecution = true;
          break;
        }  
      }
      if (stopExecution) {
        break;
      }
    }
  }
 
  private executeStatement(s: KDCodeStatement, i: number) {
    switch(s.name) {
      case StatementCode.JUMP: {
          this.execJump(s.numberValue ? 
            s.numberValue 
          : (DefaultNumberValue.get(s.name) ? 
            DefaultNumberValue.get(s.name)
            : 100)!);
          break;
      }
      case StatementCode.SET_STROKE: {
          this.execSetStroke(s.stringValue ? 
            s.stringValue 
          : DefaultStringValue.get(s.name)!);
          break;
      }
    }
  }

  public execJump(delta: number) {
    const svg: SVGElement = document.querySelector("svg")!;
    const pencil = document.getElementById("pencil")!;

    var newLine = document.createElementNS(this.SVG_NS,'line');
    newLine.setAttribute('id', 'line2');
    newLine.setAttribute('x1', this.pencil.penX.toString());
    newLine.setAttribute('y1', this.pencil.penY.toString());
    newLine.setAttribute('x2', (delta + this.pencil.penX).toString());
    newLine.setAttribute('y2',this.pencil.penY.toString());
    newLine.setAttribute("stroke", this.stroke)
    svg.append(newLine);

    pencil.setAttribute('x', (delta + this.pencil.x).toString());
    this.setPencil(delta + this.pencil.penX, this.pencil.penY);
  } 

  public execSetStroke(stroke: string) {
    this.stroke = stroke;
  } 
}