import { ChangeEvent, useContext, useState } from "react";
import { KDCodeStatement } from "../../../model/kidDevModel";
import './StatementLine.css';
import { NumberValueTitle, StatementTitle } from "./../../../constants/modelConstants";
import KDContext, { KDContextType } from "../../../model/KDContext";
import { DISPLAY_LEVEL } from "../../../constants/displayLevelConstants";

export interface JumpStatementProps {
  statement: KDCodeStatement;
}

export const JumpStatement = (props: JumpStatementProps) => 
{
  const s: KDCodeStatement = props.statement;
  const {
    displayLevel,
    setCodeStatement
  } = useContext(KDContext) as KDContextType;
 
  const [numberInput, setNumberInput] = useState<number>(
    (s.numberValue !== undefined && s.numberValue > 0) ? s.numberValue : 0
  );

  return (
    <div className="kd-statement-line">
      <div className="kd-statement-line-icon">
        <img src="resources/jump32.png" className="banner-icon" 
          title="התקדם"  alt="התקדם"/>
      </div>
      <div className="kd-statement-line-title">{StatementTitle.get(s.name)}</div>
      {displayLevel <= DISPLAY_LEVEL.JUMP_NO_ATTR ?
        <div className="kd-statement-line-parameters">
          {s.numberValue ? `${s.numberValue} ${NumberValueTitle.get(s.name) ? NumberValueTitle.get(s.name) : ""}` : ""}
        </div>
      : <div className="kd-statement-line-parameters">
          <div style={{display: "flex"}}>
            <input value={numberInput}
              style={{width: "50px", marginLeft: "8px"}}
              onChange={(e:ChangeEvent<HTMLInputElement>)=>{
                const newValue = Number(e.target.value);
                setNumberInput(newValue); 
                s.numberValue = newValue;
                setCodeStatement(s);}}>
            </input>
            {NumberValueTitle.get(s.name) ? NumberValueTitle.get(s.name) : ""}
          </div>
        </div>
      }
    </div>
  )
}