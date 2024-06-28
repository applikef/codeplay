import { useContext } from "react";
import { CodeArea } from "./codeArea/CodeArea";
import { DisplayArea } from "./DisplayArea";
import KDContext, { KDContextType } from "./../model/KDContext";

import "./../assets/styles/kidDev.css";
import { DISPLAY_LEVEL } from "../utils/displayLevelUtil";

export interface WorkBenchProps {
}

export const Workbench = (props: WorkBenchProps) => 
{  
  const { 
    displayLevel,
  } = useContext(KDContext) as KDContextType;

  return(
    <div className="app-page">
      <div className="kd-workbench">
        { displayLevel > DISPLAY_LEVEL.PENCIL_ONLY &&
          <CodeArea></CodeArea>
        }
        <DisplayArea></DisplayArea>
      </div>
    </div>
  )
}
