import { useContext } from "react";
import KDContext, { KDContextType } from "./../../model/KDContext";
import { StatementLine } from "./StatementLine";
import { CodeAreaControlBar } from "./CodeAreaControlBar";
import { DISPLAY_LEVEL } from "./../../utils/displayLevelUtil";
import "./../../assets/styles/kidDev.css";
import { StatementsControlBar } from "./StatementsControlBar";

export interface CodeAreaProps {

}

export const CodeArea = (props: CodeAreaProps) => 
{  
  const {
    displayLevel,
    code,
  } = useContext(KDContext) as KDContextType;

  return(
    <div className="kd-code">
      <CodeAreaControlBar></CodeAreaControlBar>
      <div className="kd-code-area-work-area">
        {displayLevel >= DISPLAY_LEVEL.COLORS_STMTS &&
          <StatementsControlBar></StatementsControlBar>
        }
        <table className="kd-code-area"><tbody>
        {
          code.code.map((block)=>block.statements.map((s,i)=>
            <StatementLine statement={s} readOnly={displayLevel < DISPLAY_LEVEL.JUMP} key={i} />))
        }
        </tbody></table>
      </div>
    </div>
  )
}