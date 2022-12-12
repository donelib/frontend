import React from "react";
import { useNavigate } from "react-router-dom";
import iconBack from "../../../assets/icon_back.svg";
import ToolBar from "./ToolBar";

const BackButtonToolBar = () => {
  const navigate = useNavigate();
  return (
    <ToolBar imgSrc={iconBack} onClick={()=>{navigate(-1)}}/>
  )
}
export default React.memo(BackButtonToolBar);