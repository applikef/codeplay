import { useContext, useState } from "react";
import KDContext, { KDContextType } from "./../model/KDContext";
import { Workbench } from "./../components/Workbenck";
import { KidDevBanner } from "../components/KDBanner/KDBanner";
import { DISPLAY_LEVEL } from "./../utils/displayLevelUtil";

import "./../assets/styles/kidDev.css";
import { StatementCode } from "../model/modelConstants";
import { DEFAULT_PENCIL_POSITION } from "../constants/displayConstants";

export interface KidDevProps {

}

export const KidDev = (props: KidDevProps) => 
{  
  const { 
    displayLevel,
    setDisplayLevel,
    setPencil,
    setCode
  } = useContext(KDContext) as KDContextType;

  const [settingsDisplay, setSettingsDisplay] = useState<string>("kd-settings-display-hide");
  let newDisplayLevel = displayLevel;

  function initCode() {
    setPencil(DEFAULT_PENCIL_POSITION.penX, DEFAULT_PENCIL_POSITION.penY);
    if (newDisplayLevel === DISPLAY_LEVEL.JUMP_NO_ATTR) {
      setCode({code: [{statements: [{
        id: '1',
        name: StatementCode.JUMP
      }]}]});
    }  
    else if (newDisplayLevel === DISPLAY_LEVEL.JUMP_READ_ONLY || newDisplayLevel === DISPLAY_LEVEL.JUMP) {
      setCode({code: [{statements: [{
        id: '1',
        name: StatementCode.JUMP,
        magnitude: 20
      }]}]});
    }
    else if (newDisplayLevel >= DISPLAY_LEVEL.OTHER) {
      alert('מסך זה עדיין לא קיים');
    }
  }

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
            initCode();
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
