import { useContext, useState } from "react";
import KDContext, { KDContextType } from "./../model/KDContext";
import { Workbench } from "./../components/Workbenck";
import { KidDevBanner } from "../components/KDBanner/KDBanner";
import { DISPLAY_LEVEL } from "../constants/displayLevelConstants";

import "./../assets/styles/kidDev.css";
import { StatementCode } from "../constants/modelConstants";
import { initCode } from "../utils/codeUtil";

export interface KidDevProps {

}

export const KidDev = (props: KidDevProps) => 
{  
  const { 
    displayLevel,
    setDisplayLevel,
    setCode
  } = useContext(KDContext) as KDContextType;

  const [settingsDisplay, setSettingsDisplay] = useState<string>("kd-settings-display-hide");
  let newDisplayLevel = displayLevel;

  return(
    <div className="app-page">
      <KidDevBanner settings={() => setSettingsDisplay("kd-settings-display-show")}></KidDevBanner>
      <div className="kd-home">
        <Workbench />
      </div>

      <div className={`kd-settings-area ${settingsDisplay}`}>
        <span style={{paddingLeft: "10px"}}>רמה</span>          
        <input value={ displayLevel } 
          type="number" 
          min="0"
          style={{ width: "50px" }}
          onChange={ (e) => {
            newDisplayLevel = Number(e.target.value);
            setCode(initCode(newDisplayLevel));
            setDisplayLevel(newDisplayLevel);
          }} />
        <div style={{marginTop: "8px"}}>
          <button className="app-button-ghost-sm" onClick={() => {
            setSettingsDisplay("kd-settings-display-hide");
          }}>סגור</button>
        </div>
      </div>
    </div>
  )
}
