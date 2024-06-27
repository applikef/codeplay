import { useContext } from "react";
import KidDevContext, { KidDevContextType } from "./../model/KidDevContext";
import "./../assets/styles/kidDev.css";

export interface DisplayAreaProps {
}

export const DisplayArea = (props: DisplayAreaProps) => {
  const DISPLAY_WIDTH = 800; 
  const DISPLAY_HEIGHT = 600; 
  const CODE_LEAD = "./resources/pencil128.png";

  const {
    pencilX,
    pencilY
  } = useContext(KidDevContext) as KidDevContextType;

  return(
    <div className="kd-display">
      <div>
        <svg width={DISPLAY_WIDTH} height={DISPLAY_HEIGHT}>
          <image id="pencil" href={CODE_LEAD} x={pencilX} y={pencilY}></image>
        </svg>
      </div>
      <div className="kd-display-attribute">
        <a href="https://www.freepik.com/free-vector/cute-koala-hanging-pencil-with-bag-cartoon-vector-icon-illustration-animal-education-isolated_39515607.htm#fromView=search&page=1&position=14&uuid=8be2567d-0f34-4a9b-87e1-4a4792bedcd6">Image by catalyststuff on Freepik</a>
      </div>
    </div>
  )
}
