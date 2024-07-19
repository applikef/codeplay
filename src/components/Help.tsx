import React from "react";
import { DeviceUtil } from "./../utils/DeviceUtil";
import { getHelpFileName } from "../utils/helpUtil";

export interface HelpProps {
  baseUrl?: string;
  helpPageId: string;
}

export const Help = (props: HelpProps) => {
  const baseUrl = props.baseUrl ? props.baseUrl : "";
  const fileName = getHelpFileName(props.helpPageId);
  const smallDevice = DeviceUtil.isSmallDevice();

  return(
      <iframe title="mouseJumpingShapeClick" src={`${baseUrl}resources/help/${fileName}`} 
        height={smallDevice ? "250px" : "500px"} width={smallDevice ? "500px" : "1000px"}/>
  )
}