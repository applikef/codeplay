import { Link } from "react-router-dom";
import "./KDBanner.css";
import { DISPLAY_LEVEL } from "../../utils/displayLevelUtil";
import KDContext, { KDContextType } from "../../model/KDContext";
import { useContext } from "react";

export interface KidDevBannerProps {
  settings?: Function;
}

export const KidDevBanner = (props: KidDevBannerProps) => {
  const {
    displayLevel,
  } = useContext(KDContext) as KDContextType;

  return (
    <>
        <div className="banner-icon-bar">
          <div className="banner-right-icon-bar">
            <Link to="/">
              <img src="resources/icons/home128.png" className="banner-icon" 
                title="עמוד הבית"  alt="עמוד הבית" />
            </Link>
            { displayLevel === DISPLAY_LEVEL.OTHER-1 &&
              <img src="resources/icons/settingsGrayed.png" className="banner-icon" 
                title="הגדרות משחק"  alt="הגדרות משחק" 
                onClick={() => props.settings ? props.settings() : undefined}/>
            }
          </div>
        </div>
      <hr className="banner-hr"/>      
    </>
  );
}
