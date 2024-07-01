import { useContext } from "react";
import { KDCodeStatement } from "../../../model/kidDevModel";
import KDContext, { KDContextType } from "../../../model/KDContext";
import "./StatementLine.css";
import { JumpStatement } from "./JumpStatement";
import { SetStrokeStatement } from "./SetStrokeStatement";
import { StatementCode } from "../../../model/modelConstants";

export interface StatementLineProps {
  statement: KDCodeStatement;
  readOnly: boolean;
}

export const StatementLine = (props: StatementLineProps) => 
{
  return(
    <div>
      { props.statement.name === StatementCode.JUMP && 
        <JumpStatement statement={props.statement} readOnly={props.readOnly} />
      }
      {
      props.statement.name === StatementCode.SET_STROKE && 
        <SetStrokeStatement statement={props.statement} readOnly={false} /> 
      }
    </div>
    
  )  
}
