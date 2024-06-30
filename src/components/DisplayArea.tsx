import { useContext } from "react";
import KDContext, { KDContextType } from "./../model/KDContext";
import "./../assets/styles/kidDev.css";
import { DISPLAY_LEVEL } from "../utils/displayLevelUtil";

export interface DisplayAreaProps {
}

export const DisplayArea = (props: DisplayAreaProps) => {
  const DISPLAY_WIDTH = 800; 
  const DISPLAY_HEIGHT = 600; 
  const CODE_LEAD = "./resources/pencil128.png";
  const PENCIL_SIZE = 64;

  const {
    displayLevel,
    pencil,
    setPencil
  } = useContext(KDContext) as KDContextType;

  const defineNextPosition = () => {
    const newPosition = getRandomPosition();
    setPencil(newPosition[0], newPosition[1]);
  }

  const getRandomPosition = (): [number,number] => {
    const d: number = PENCIL_SIZE * 2;

    let x: number = Math.floor(Math.random() * DISPLAY_WIDTH);
    x = Math.min(DISPLAY_WIDTH - d, Math.max(d, x));
    let y: number = Math.floor(Math.random() * DISPLAY_HEIGHT);
    y = Math.min(DISPLAY_HEIGHT - d, Math.max(d, y));

    let nextPosition: [number,number] = [x,y];
    if (nextPosition[0] === pencil.x && nextPosition[0] === pencil.y) {
      nextPosition = [x+10, y-5];
    }
    return nextPosition;
  }

  return(
    <div className="kd-display">
      <div>
        <div>
          { displayLevel === DISPLAY_LEVEL.PENCIL_ONLY &&
          <span>הַקְלֵק עַל הָעַכְבָּר שֶׁעַל הַמָּסָךְ</span>
          }
        </div>
        <svg width={DISPLAY_WIDTH} height={DISPLAY_HEIGHT}>
          <image id="pencil" href={CODE_LEAD} x={pencil.x} y={pencil.y}
            onClick={() => displayLevel === DISPLAY_LEVEL.PENCIL_ONLY && 
              defineNextPosition()}></image>
        </svg>
      </div>
      <div className="kd-display-attribute">
        <a href="https://www.freepik.com/free-vector/cute-koala-hanging-pencil-with-bag-cartoon-vector-icon-illustration-animal-education-isolated_39515607.htm#fromView=search&page=1&position=14&uuid=8be2567d-0f34-4a9b-87e1-4a4792bedcd6">Image by catalyststuff on Freepik</a>
      </div>
    </div>
  )
}
