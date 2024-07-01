import { ChangeEvent, useContext, useState } from "react";
import { KDCodeStatement } from "../../../model/kidDevModel";
import { StatementCode } from "../../../model/modelConstants";
import { DefaultStringValue, StatementTitle } from "../../../utils/statementsUtil";
import './StatementLine.css';
import KDContext, { KDContextType } from "../../../model/KDContext";

export interface SetStrokeStatementProps {
  statement: KDCodeStatement;
  readOnly: boolean;
}

export const SetStrokeStatement = (props: SetStrokeStatementProps) => 
{
  const s: KDCodeStatement = props.statement;
  const strokeColor: string = s.stringValue ? 
    s.stringValue 
  : 
    DefaultStringValue.get(StatementCode.SET_STROKE)!;

  const {
    setCodeStatement
  } = useContext(KDContext) as KDContextType;  
  
  const [newStroke, setNewStroke] = useState<string>(strokeColor!);

  return(
    <div className="kd-statement-line">
      <div className="kd-statement-line-icon">
        <div className="kd-statement-control-bar-color-icon" 
          style={{ "background": strokeColor }}>
        </div>
      </div>
      <div className="kd-statement-line-title">{StatementTitle.get(s.name)}</div>
      {props.readOnly ?
        <div className="kd-statement-line-parameters">
          { strokeColor }
        </div>
      : <div className="kd-statement-line-parameters">
          <div style={{display: "flex"}}>
            <input value={strokeColor}
              style={{width: "50px", marginLeft: "8px"}}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                const newValue = e.target.value;
                setNewStroke(newValue);
                s.stringValue = newValue;
                setCodeStatement(s);}}>
            </input>
          </div>
        </div>
      }
    </div>
  )
}
  
