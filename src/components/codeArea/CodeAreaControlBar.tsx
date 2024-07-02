import { useContext } from "react";
import KDContext, { KDContextType } from "./../../model/KDContext";
import { CodeInterpreter } from "../../model/CodeInterpreter";
import { DISPLAY_LEVEL } from "./../../utils/displayLevelUtil";
import "./../../assets/styles/kidDev.css";

export interface CodeAreaControlBarProps {

}

export const CodeAreaControlBar = (props: CodeAreaControlBarProps) => 
{  
  const context = useContext(KDContext) as KDContextType;
  const interpreter = new CodeInterpreter(context)

  return(
    <div className="kd-control-bar">
      <img src="resources/play32.png" className="kd-control-bar-icon app-clickable"
        title="בצע"  alt="בצע"
        onClick={() => interpreter.execute()}/>
      { context.displayLevel >= DISPLAY_LEVEL.RESET &&
        <img src="resources/reset32.png" className="kd-control-bar-icon app-clickable"
          title="מחק הכל"  alt="מחק הכל"
          onClick={() => interpreter.reset()}/>
      }
    </div>
  )
}

