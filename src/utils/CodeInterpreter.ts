import { StatementCode } from "../model/modelConstants";
import { KDContextType } from "./../model/KDContext";
import { KDCodeBlock, KDCodeStatement } from "./../model/kidDevModel";
import { DefaultMagnitude } from "./statementsUtil";

export class CodeInterpreter { 
  private context: KDContextType;

  constructor(context: KDContextType) {
    this.context = context;
  }

  private SVG_NS = 'http://www.w3.org/2000/svg';
  public svg: SVGElement = document.querySelector("svg")!;
  public pencil = document.getElementById("pencil")!;
  
  public reset() {
    while (this.svg !== null && this.svg.lastChild) {
      this.svg.removeChild(this.svg.lastChild);
    }

    var newPencil = document.createElementNS(this.SVG_NS,'image');
    newPencil.setAttribute('id', 'pencil');
    newPencil.setAttribute('href', "./resources/pencil128.png");
    newPencil.setAttribute('x', '100');
    newPencil.setAttribute('y', '100');
    this.svg.append(newPencil);

    this.context.setPencil(162,216);
  }

  public execute() {
    this.svg = document.querySelector("svg")!;
    this.pencil = document.getElementById("pencil")!;
    if (this.context.displayLevel === 0) {
      return;
    }
    this.context.code.code.map((block: KDCodeBlock)=>block.statements.map((s,i)=>
      this.executeStatement(s,i)
    ))
  }
 
  private executeStatement(s: KDCodeStatement, i: number) {
    switch(s.name) {
      case StatementCode.JUMP: {
          this.jump(s.magnitude ? 
            s.magnitude 
          : (DefaultMagnitude.get(s.name) ? 
            DefaultMagnitude.get(s.name)
            : 100)!);
          break;
      }
    }
  }

  public jump(delta: number) {
    var newLine = document.createElementNS(this.SVG_NS,'line');
    newLine.setAttribute('id', 'line2');
    newLine.setAttribute('x1', this.context.pencil.penX.toString());
    newLine.setAttribute('y1', this.context.pencil.penY.toString());
    newLine.setAttribute('x2', (delta + this.context.pencil.penX).toString());
    newLine.setAttribute('y2',this.context.pencil.penY.toString());
    newLine.setAttribute("stroke", this.context.stroke)
    this.svg.append(newLine);

    this.pencil.setAttribute('x', (delta + this.context.pencil.x).toString());

    this.context.setPencil(delta + this.context.pencil.penX, this.context.pencil.penY);
  } 
}