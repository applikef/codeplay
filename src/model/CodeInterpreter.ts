import { StatementCode } from "../constants/modelConstants";
import { KDContextType } from "./KDContext";
import { KDCode, KDCodeStatement, KDPencil } from "./kidDevModel";
import { DefaultNumberValue, DefaultStringValue } from "./../constants/modelConstants";
import { DEFAULT_PENCIL_PEN_DELTA_X, DEFAULT_PENCIL_PEN_DELTA_Y, DEFAULT_PENCIL } from "../constants/displayConstants";
import { showError } from "../utils/errorsUtil";
import { KD_APP_ERROR_MESSAGES } from "../constants/appErrorMessages";
import { CodeValidator } from "./CodeValidator";
import { toRadians } from "../utils/generalUtils";

export class CodeInterpreter { 
  private displayLevel: number;
  private code: KDCode;

  constructor(context: KDContextType) {
    this.displayLevel = context.displayLevel;
    this.code = context.code;
  }

  private SVG_NS = 'http://www.w3.org/2000/svg';
  private pencil:KDPencil = DEFAULT_PENCIL;

  private setPencilPosition(penX: number, penY: number) {
    const newX: number = penX - DEFAULT_PENCIL_PEN_DELTA_X;
      // (DEFAULT_PENCIL_PEN_DELTA_X*Math.cos(toRadians(this.pencil.angle)));
      // (DEFAULT_PENCIL_PEN_DELTA_X*Math.cos(toRadians(this.pencil.angle)) +
      // (DEFAULT_PENCIL_PEN_DELTA_Y*Math.sin(toRadians(this.pencil.angle))));
      //(this.pencil.x+(DEFAULT_PENCIL_PEN_DELTA_X*Math.cos(toRadians(this.pencil.angle))));
    const newY: number = penY - DEFAULT_PENCIL_PEN_DELTA_Y;
      //  (DEFAULT_PENCIL_PEN_DELTA_Y*Math.cos(toRadians(this.pencil.angle)));
      // (DEFAULT_PENCIL_PEN_DELTA_Y*Math.cos(toRadians(this.pencil.angle)) -
      //   DEFAULT_PENCIL_PEN_DELTA_X*Math.sin(toRadians(this.pencil.angle)));
      // (this.pencil.y-(DEFAULT_PENCIL_PEN_DELTA_Y*Math.sin(toRadians(this.pencil.angle))));

    this.pencil = {
      x: newX,
      y: newY,
      penX: penX,
      penY: penY,
      stroke: this.pencil.stroke,
      angle: this.pencil.angle,
      rotate: this.pencil.rotate
    };
  }

  private setPencilAngle(angle: number) {
    this.pencil.rotate = this.pencil.angle - angle;
    this.pencil.angle = angle;
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
    newPencil.setAttribute('transform', "rotate(0)");
    svg.append(newPencil);
    
    this.pencil = DEFAULT_PENCIL;
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
    if (s.name === StatementCode.JUMP) {
      this.execJump(s.numberValue ? 
        s.numberValue 
      : (DefaultNumberValue.get(s.name) ? 
        DefaultNumberValue.get(s.name)
        : 100)!);
    }
    else if (s.name === StatementCode.SET_STROKE) {
      this.execSetStroke(s.stringValue ? 
        s.stringValue 
      : DefaultStringValue.get(s.name)!);
    }
    else if (s.name === StatementCode.TURN_DOWN || 
      s.name === StatementCode.TURN_UP ||
      s.name === StatementCode.TURN_RIGHT ||
      s.name === StatementCode.TURN_LEFT ||
      s.name === StatementCode.TURN) {
        this.execTurn(s.numberValue);
    }
  }

  public execJump(delta: number) {
    const svg: SVGElement = document.querySelector("svg")!;
    const pencil = document.getElementById("pencil")!;

    const newPenX: number = (this.pencil.penX+(delta*Math.cos(toRadians(this.pencil.angle))));
    const newPenY: number = (this.pencil.penY-(delta*Math.sin(toRadians(this.pencil.angle))));

    var newLine = document.createElementNS(this.SVG_NS,'line');
    newLine.setAttribute('id', 'line2');
    newLine.setAttribute('x1', this.pencil.penX.toString());
    newLine.setAttribute('y1', this.pencil.penY.toString());
    newLine.setAttribute('x2', newPenX.toString());
    newLine.setAttribute('y2', newPenY.toString());
    newLine.setAttribute("stroke", this.pencil.stroke)
    svg.append(newLine);

    this.setPencilPosition(newPenX, newPenY);
    pencil.setAttribute('x', this.pencil.x.toString());
    pencil.setAttribute('y', this.pencil.y.toString());
  } 

  public execSetStroke(stroke: string) {
    this.pencil.stroke = stroke;
  } 

  public execTurn(angle: number | undefined) {
    if (angle === undefined) {
      angle = 0;
    }

    if (angle >= 0) {
      this.setPencilAngle(angle!);

      // const pencil = document.getElementById("pencil")!;
      // pencil.setAttribute('transform', `rotate(${this.pencil.rotate}, ${this.pencil.penX}, ${this.pencil.penY})`);
      // pencil.setAttribute('x', "100");
      // pencil.setAttribute('y', "100");
      // this.pencil.x.toString()
    }
  }
}