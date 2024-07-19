import { Link } from "react-router-dom";
import "./KDBanner.css";
import { DISPLAY_LEVEL } from "../../constants/displayLevelConstants";
import KDContext, { KDContextType } from "../../model/KDContext";
import { useContext, useState } from "react";
import { Help } from "../Help";

export interface KidDevBannerProps {
  settings?: Function;
}

export const KidDevBanner = (props: KidDevBannerProps) => {
  const {
    displayLevel,
  } = useContext(KDContext) as KDContextType;

  const [showHelp, setShowHelp] = useState<string>("banner-hide-help");

  return (
    <>
        <div className="banner-icon-bar">
          <div className="banner-right-icon-bar">
            <Link to="/">
              <img src="resources/icons/home128.png" className="banner-icon app-clickable" 
                title="עמוד הבית"  alt="עמוד הבית" />
            </Link>
            { displayLevel === DISPLAY_LEVEL.OTHER-1 &&
              <img src="resources/icons/settingsGrayed.png" className="banner-icon" 
                title="הגדרות משחק"  alt="הגדרות משחק" 
                onClick={() => props.settings ? props.settings() : undefined}/>
            }
          </div>
          <div className="banner-left-icon-bar">
            <div onClick={() => {               
                setShowHelp(() => showHelp === "banner-show-help" ? "banner-hide-help" : "banner-show-help")}
              }>
                <img src="resources/icons/help.png" className="banner-icon" 
                  title="עזרה: קליק לפתיחה ולסגירה"  alt="עזרה" />
            </div>
          </div>
        </div>
      <hr className="banner-hr"/>      
      <div className={`banner-help-content ${showHelp}`}>
        <Help helpPageId={displayLevel.toString()} />
      </div>
    </>
  );
}
