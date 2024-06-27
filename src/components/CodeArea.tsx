import { useContext } from "react";
import "./../assets/styles/kidDev.css";
import KidDevContext, { KidDevContextType } from "./../model/KidDevContext";
import { StatementLine } from "./StatementLine";
import { KidDevControlBar } from "./KidDevControlBar";
import { DISPLAY_LEVEL } from "./../utils/displayLevelUtil";

export interface CodeAreaProps {

}

export const CodeArea = (props: CodeAreaProps) => 
{  
  const {
    displayLevel,
    code,
  } = useContext(KidDevContext) as KidDevContextType;

  return(
    <div className="kid-dev-code">
      <KidDevControlBar></KidDevControlBar>
      <table className="kd-code-area"><tbody>
      {
        code.code.map((block)=>block.statements.map((s,i)=>
          <StatementLine statement={s} readOnly={displayLevel < DISPLAY_LEVEL.JUMP} key={i} />))
      }
      </tbody></table>
    </div>
  )
}