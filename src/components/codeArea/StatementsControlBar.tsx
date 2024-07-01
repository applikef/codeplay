import { useContext } from "react";
import KDContext, { KDContextType } from "../../model/KDContext";
import "./../../assets/styles/kidDev.css";
import { StrokeColors, StrokeColorsHex } from "../../constants/displayConstants";
import { KDCodeStatement } from "../../model/kidDevModel";
import { StatementCode } from "../../model/modelConstants";
import { addStatement } from "../../utils/statementsUtil";
import { getTimestamp } from "../../utils/generalUtils";

export interface StatementsControlBarProps {
  updateCode: Function;
}

export const StatementsControlBar = (props: StatementsControlBarProps) => 
{  
  const {
    code,
    setCode
  } = useContext(KDContext) as KDContextType;

  function addStrokeStatement(strokeHex: string) {
    const setStrokeStatement: KDCodeStatement = {
      id: getTimestamp(),
      name: StatementCode.SET_STROKE,
      stringValue: strokeHex
    }; 
    props.updateCode(setStrokeStatement);
    // setCode(addStatement(code, setStrokeStatement));
  }

  return (
    <div className="kd-statement-control-bar-global">
      { StrokeColors.map((color, i) => 
          <div className="kd-statement-control-bar-color-icon" 
            key={color}
            style={{ "background": StrokeColorsHex.get(color) }}
            onClick={() => addStrokeStatement(StrokeColorsHex.get(color)!)}>
          </div>
      )
    }
    </div>
  )
}
