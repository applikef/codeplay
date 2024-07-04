import { useContext, useState } from "react";
import KDContext, { KDContextType } from "./../../model/KDContext";
import { StatementLine } from "./StatementLine/StatementLine";
import { CodeAreaControlBar } from "./CodeAreaControlBar";
import { DISPLAY_LEVEL } from "../../constants/displayLevelConstants";
import "./../../assets/styles/kidDev.css";
import { StatementsControlBar } from "./StatementsControlBar";
import { KDCodeStatement } from "../../model/kidDevModel";
import { addStatement, deleteStatement, getNumberOfStatements } from "../../utils/codeUtil";

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
    setCodeLength(getNumberOfStatements(code));
  }

  function deleteSelectedStatement(statement: KDCodeStatement) {
    setCode(deleteStatement(code, statement));
    setCodeLength(getNumberOfStatements(code));
  }

  return(
    <div className="kd-code">
      <CodeAreaControlBar></CodeAreaControlBar>
      <div className="kd-code-area-work-area">
        {displayLevel >= DISPLAY_LEVEL.DELETE_AND_JUMP_STATEMENT &&
          <StatementsControlBar updateCode={updateCode}></StatementsControlBar>
        }
        <div className="kd-code-area">
        { codeLength > 0 &&
          code.code.map((block)=>block.statements.map((s,i)=>
            <div className="kd-statement-line-global">
              { displayLevel >= DISPLAY_LEVEL.DELETE_AND_JUMP_STATEMENT &&
                <div className="kd-statement-line-icons">
                  <img src="./resources/delete32.png" alt="מחק" height={24}
                    onClick={() => deleteSelectedStatement(s)}/>
                </div>
              }
              <StatementLine statement={s} key={i} />
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}