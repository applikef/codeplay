import { ChangeEvent, useContext, useState } from "react";
import { KDCodeStatement } from "../../../model/kidDevModel";
import './StatementLine.css';
import { MagnitudeTitle, StatementTitle } from "../../../utils/statementsUtil";
import KDContext, { KDContextType } from "../../../model/KDContext";

export interface JumpStatementProps {
  statement: KDCodeStatement;
  readOnly: boolean;
}

export const JumpStatement = (props: JumpStatementProps) => 
{
  const s: KDCodeStatement = props.statement;
  const {
    setCodeStatement
  } = useContext(KDContext) as KDContextType;
 
  const [numberInput, setNumberInput] = useState<number>(
    (s.magnitude !== undefined && s.magnitude > 0) ? s.magnitude : 0
  );

  return (
    <div className="kd-statement-line">
      <div className="kd-statement-line-icon">
        <img src="resources/jump32.png" className="banner-icon" 
          title="התקדם"  alt="התקדם"/>
      </div>
      <div className="kd-statement-line-title">{StatementTitle.get(s.name)}</div>
      {props.readOnly ?
        <div className="kd-statement-line-parameters">
          {s.magnitude ? `${s.magnitude} ${MagnitudeTitle.get(s.name) ? MagnitudeTitle.get(s.name) : ""}` : ""}
        </div>
      : <div className="kd-statement-line-parameters">
          <div style={{display: "flex"}}>
            <input value={numberInput}
              style={{width: "50px", marginLeft: "8px"}}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                const newValue = Number(e.target.value);
                setNumberInput(newValue); 
                s.magnitude = newValue;
                setCodeStatement(s);}}>
            </input>
            {MagnitudeTitle.get(s.name) ? MagnitudeTitle.get(s.name) : ""}
          </div>
        </div>
      }
    </div>
  )
}