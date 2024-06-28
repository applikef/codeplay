import { useContext } from "react";
import KDContext, { KDContextType } from "../../model/KDContext";
import "./../../assets/styles/kidDev.css";

export interface StatementsControlBarProps {

}

export const StatementsControlBar = (props: StatementsControlBarProps) => 
{  
  const context = useContext(KDContext) as KDContextType;
  return (
    <div className="kd-statement-control-bar-global">
      <div className="kd-statement-control-bar-color-icon" style={{ "background": "#ff0000" }}></div>
      <div className="kd-statement-control-bar-color-icon" style={{ "background": "#00ff00" }}></div>
      <div className="kd-statement-control-bar-color-icon" style={{ "background": "#0000ff" }}></div>
    </div>
  )
}
