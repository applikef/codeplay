import { KDCodeStatement } from "../../../model/kidDevModel";
import "./statementLine.css";
import { JumpStatement } from "./JumpStatement";
import { SetStrokeStatement } from "./SetStrokeStatement";
import { StatementCode } from "../../../constants/modelConstants";

export interface StatementLineProps {
  statement: KDCodeStatement;
}

export const StatementLine = (props: StatementLineProps) => 
{
  return(
    <div>
      { props.statement.name === StatementCode.JUMP && 
        <JumpStatement statement={props.statement} />
      }
      {
      props.statement.name === StatementCode.SET_STROKE && 
        <SetStrokeStatement statement={props.statement} /> 
      }
    </div>
    
  )  
}
