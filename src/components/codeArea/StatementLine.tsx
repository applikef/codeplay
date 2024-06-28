import { ChangeEvent, useContext, useState } from "react";
import { KDCodeStatement } from "./../../model/kidDevModel";
import KDContext, { KDContextType } from "./../../model/KDContext";
import { MagnitudeTitle, StatementTitle } from "./../../utils/statementsUtil";
import "./../../assets/styles/kidDev.css";

export interface StatementLineProps {
  statement: KDCodeStatement;
  readOnly: boolean;
}

export const StatementLine = (props: StatementLineProps) => 
{
  const {
    setCodeStatement
  } = useContext(KDContext) as KDContextType;

  const s: KDCodeStatement = props.statement;
  const [numberInput, setNumberInput] = useState<number>(
    (s.magnitude !== undefined && s.magnitude > 0) ? s.magnitude : 0
  );

  return(
    <tr className="kd-statement-line">
      <td className="kd-statement-line-icon">
        <img src="resources/jump32.png" className="banner-icon" 
          title="קפוץ"  alt="קפוץ"/>
      </td>
      <td className="kd-statement-line-title">{StatementTitle.get(s.name)}</td>
      {props.readOnly ?
        <td className="kd-statement-line-column">{s.magnitude ? `${s.magnitude} ${MagnitudeTitle.get(s.name) ? MagnitudeTitle.get(s.name) : ""}` : ""}</td>
      : <td className="kd-statement-line-column">
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
        </td>
      }
    </tr>
  )  
}
