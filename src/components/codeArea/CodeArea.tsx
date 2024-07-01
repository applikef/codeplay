import { useContext, useState } from "react";
import KDContext, { KDContextType } from "./../../model/KDContext";
import { StatementLine } from "./StatementLine/StatementLine";
import { CodeAreaControlBar } from "./CodeAreaControlBar";
import { DISPLAY_LEVEL } from "./../../utils/displayLevelUtil";
import "./../../assets/styles/kidDev.css";
import { StatementsControlBar } from "./StatementsControlBar";
import { KDCodeStatement } from "../../model/kidDevModel";
import { addStatement } from "../../utils/statementsUtil";

export interface CodeAreaProps {

}

export const CodeArea = (props: CodeAreaProps) => 
{  
  const {
    displayLevel,
    code,
    setCode
  } = useContext(KDContext) as KDContextType;

  const [codeLength, setCodeLength] = useState<number>(code.code[0].statements.length);

  function updateCode(newStatement: KDCodeStatement) {
    setCode(addStatement(code, newStatement));
    setCodeLength(code.code[0].statements.length);
  }

  return(
    <div className="kd-code">
      <CodeAreaControlBar></CodeAreaControlBar>
      <div className="kd-code-area-work-area">
        {displayLevel >= DISPLAY_LEVEL.COLORS_STMTS &&
          <StatementsControlBar updateCode={updateCode}></StatementsControlBar>
        }
        <div className="kd-code-area">
        { codeLength > 0 &&
          code.code.map((block)=>block.statements.map((s,i)=>
            <StatementLine statement={s} readOnly={displayLevel < DISPLAY_LEVEL.JUMP} key={i} />))
        }
        </div>
      </div>
    </div>
  )
}