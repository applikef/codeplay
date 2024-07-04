import "./../assets/styles/kidDev.css";
import { useNavigate } from "react-router-dom";
import { getUserDescriptor } from "./../utils/usersUtil";
import { useContext } from "react";
import KDContext, { KDContextType } from "./../model/KDContext";
import { KDCode, KDUserDescriptor } from "./../model/kidDevModel";
import { DISPLAY_LEVEL, DisplayLevelTitle } from "../constants/displayLevelConstants";
import { StatementCode } from "../constants/modelConstants";
import { KD_APP_STRINGS } from "../constants/appStrings";
import { initCode } from "../utils/codeUtil";

export const KidDevLanding = () => {
  const navigate = useNavigate();
  const { 
    displayLevel,
    setDisplayLevel,
    setCode
  } = useContext(KDContext) as KDContextType;

  const usersDescriptor = require('./../assets/userDescriptors.json');
  const users = usersDescriptor.users;

  let userDisplayLevel: DISPLAY_LEVEL = DISPLAY_LEVEL.OTHER;

  function openApp(userId: string) {
    let userDescriptor: KDUserDescriptor = getUserDescriptor(userId);
    userDisplayLevel = userDescriptor.displayLevel >= 0 ?
      userDescriptor.displayLevel
    : DISPLAY_LEVEL.OTHER;
    setDisplayLevel(userDisplayLevel);
    setCode(initCode(userDisplayLevel));
    navigate('/home');      
  }

  return (
    <div className="app-page">
      <h1>מי אני?</h1>
      <h2>
        הַתְחֵל בְּרָמַת הַתְחָלָה 
      </h2>
      <br/>
      <div className="kd-user-list">
        {users.map((user: KDUserDescriptor, i: number) => 
          <div className="kd-user-card" key={user.id}>
            <img src={`./resources/users/${user.image}`} alt={user.id} height={100}
              className={`app-clickable kd-user-card-image ${user.displayLevel === displayLevel ? "kd-user-card-image-selected": ""}`} 
              onClick={() => openApp(user.id)}
              style={{ marginTop: i*32}}
              title={DisplayLevelTitle.get(user.displayLevel) ? 
                DisplayLevelTitle.get(user.displayLevel)
              : `רמה ${user.displayLevel}`}/>
            <div 
              className={user.displayLevel === displayLevel ? "kd-user-card-title-selected" : ""}>{
              DisplayLevelTitle.get(user.displayLevel) ? 
                DisplayLevelTitle.get(user.displayLevel)
              : `${KD_APP_STRINGS.STAGE} ${user.displayLevel}`}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}