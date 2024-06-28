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
    while (this.svg.lastChild) {
      this.svg.removeChild(this.svg.lastChild);
    }

    var newPencil = document.createElementNS(this.SVG_NS,'image');
    newPencil.setAttribute('id', 'pencil');
    newPencil.setAttribute('href', "./resources/pencil128.png");
    newPencil.setAttribute('x', '100');
    newPencil.setAttribute('y', '100');
    this.svg.append(newPencil);

    this.context.setPencilX(100);
    this.context.setPencilY(100);
    this.context.setPenX(100 + 62);
    this.context.setPenY(100 + 116);
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
    newLine.setAttribute('x1', this.context.penX.toString());
    newLine.setAttribute('y1', this.context.penY.toString());
    newLine.setAttribute('x2', (delta + this.context.penX).toString());
    newLine.setAttribute('y2',this.context.penY.toString());
    newLine.setAttribute("stroke", this.context.stroke)
    this.svg.append(newLine);

    this.pencil.setAttribute('x', (delta + this.context.pencilX).toString());

    this.context.setPenX(delta + this.context.penX);
    this.context.setPencilX(delta + this.context.pencilX);
  } 
}