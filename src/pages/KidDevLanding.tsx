import "./../assets/styles/kidDev.css";
import { useNavigate } from "react-router-dom";
import { useContext } from "react";
import KDContext, { KDContextType } from "./../model/KDContext";
import { DISPLAY_LEVEL } from "../constants/displayLevelConstants";
import { KD_APP_STRINGS } from "../constants/appStrings";
import { initCode } from "../utils/codeUtil";

export const KidDevLanding = () => {
  const navigate = useNavigate();
  const { 
    displayLevel,
    setDisplayLevel,
    setCode
  } = useContext(KDContext) as KDContextType;

  function openApp(level: string | DISPLAY_LEVEL) {
    setDisplayLevel(Number(level));
    setCode(initCode(Number(level)));
    navigate('/home');      
  }

  function getImage(index: number): string {
    const numberOfImages = 3;
    const imageIndex = index % numberOfImages + 1;
    return `./resources/users/user${imageIndex}.png`;
  }

  const displayLevelsArray:(string | DISPLAY_LEVEL)[] = Object.values(DISPLAY_LEVEL);
  /* Select the last part of the array that contains the enum values excluding the last 
     element that is OTHER
  */
  const displayLevelValues: (string | DISPLAY_LEVEL)[] = 
    displayLevelsArray.slice((displayLevelsArray.length/2), (displayLevelsArray.length-1));

  return (
    <div className="app-page">
      <h1>מי אני?</h1>
      <h2>
        הַתְחֵל בְּרָמַת הַתְחָלָה 
      </h2>
      <br/>
      <div className="kd-user-list">
        {displayLevelValues.map((level: (string | DISPLAY_LEVEL), i) => 
          <div className="kd-user-card" key={level}>
            <img src={getImage(Number(level))} alt={level.toString()} height={100}
              className={`app-clickable kd-user-card-image ${level === displayLevel ? "kd-user-card-image-selected": ""}`} 
              onClick={() => openApp(level)}
              style={{ marginTop: i*32}}
              title={/*DisplayLevelTitle.get(level) ? 
                DisplayLevelTitle.get(level)
              :*/ `רמה ${level}`}/>
            <div 
              className={level === displayLevel ? "kd-user-card-title-selected" : ""}>{
              /*DisplayLevelTitle.get(user.displayLevel) ? 
                DisplayLevelTitle.get(user.displayLevel)
              :*/ `${KD_APP_STRINGS.STAGE} ${level}`}
            </div>
          </div>
        )}
      </div>
    </div>
  )
}