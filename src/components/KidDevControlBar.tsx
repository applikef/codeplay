import { useContext } from "react";
import "./../assets/styles/kidDev.css";
import KidDevContext, { KidDevContextType } from "./../model/KidDevContext";
import { CodeInterpreter } from "./../utils/CodeInterpreter";
import { DISPLAY_LEVEL } from "./../utils/displayLevelUtil";

export interface KidDevControlBarProps {

}

export const KidDevControlBar = (props: KidDevControlBarProps) => 
{  
  const context = useContext(KidDevContext) as KidDevContextType;
  const interpreter = new CodeInterpreter(context)

  return(
    <div className="kd-control-bar">
      <img src="resources/play32.png" className="kd-control-bar-icon"
        title="בצע"  alt="בצע"
        onClick={() => interpreter.execute()}/>
      { context.displayLevel >= DISPLAY_LEVEL.RESET &&
        <img src="resources/reset32.png" className="kd-control-bar-icon"
          title="מחק הכל"  alt="מחק הכל"
          onClick={() => interpreter.reset()}/>
      }
    </div>
  )
}

