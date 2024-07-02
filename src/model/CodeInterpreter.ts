import { StatementCode } from "../constants/modelConstants";
import { KDContextType } from "./KDContext";
import { KDCodeBlock, KDCodeStatement } from "./kidDevModel";
import { DefaultMagnitude, DefaultStringValue } from "./../constants/modelConstants";

export class CodeInterpreter { 
  private context: KDContextType;

  constructor(context: KDContextType) {
    this.context = context;
  }

  private SVG_NS = 'http://www.w3.org/2000/svg';
  
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
    
    this.context.setPencil(162,216);
  }

  public execute() {
    if (this.context.displayLevel === 0) {
      return;
    }

    this.reset();
    this.context.code.code.map((block: KDCodeBlock)=>block.statements.map((s,i)=>
      this.executeStatement(s,i)
    ))
  }
 
  private executeStatement(s: KDCodeStatement, i: number) {
    switch(s.name) {
      case StatementCode.JUMP: {
          this.execJump(s.magnitude ? 
            s.magnitude 
          : (DefaultMagnitude.get(s.name) ? 
            DefaultMagnitude.get(s.name)
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
    newLine.setAttribute('x1', this.context.pencil.penX.toString());
    newLine.setAttribute('y1', this.context.pencil.penY.toString());
    newLine.setAttribute('x2', (delta + this.context.pencil.penX).toString());
    newLine.setAttribute('y2',this.context.pencil.penY.toString());
    newLine.setAttribute("stroke", this.context.stroke)
    svg.append(newLine);

    pencil.setAttribute('x', (delta + this.context.pencil.x).toString());
    this.context.setPencil(delta + this.context.pencil.penX, this.context.pencil.penY);
  } 

  public execSetStroke(stroke: string) {
    this.context.setStroke(stroke)
  } 
}