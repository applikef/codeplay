import "./../assets/styles/kidDev.css";
import { useNavigate } from "react-router-dom";
import { getUserDescriptor } from "./../utils/usersUtil";
import { useContext } from "react";
import KidDevContext, { KidDevContextType } from "./../model/KidDevContext";
import { KidDevCode, KidDevUserDescriptor } from "./../model/kidDevModel";
import { DISPLAY_LEVEL } from "./../utils/displayLevelUtil";
import { StatementCode } from "./../utils/CodeInterpreter";

export const KidDevLanding = () => {
  const navigate = useNavigate();
  const { 
    displayLevel,
    setDisplayLevel,
    setCode
  } = useContext(KidDevContext) as KidDevContextType;

  const usersDescriptor = require('./../assets/userDescriptors.json');
  const users = usersDescriptor.users;

  function openApp(userId: string) {
    let userDescriptor: KidDevUserDescriptor = getUserDescriptor(userId);
    setDisplayLevel(userDescriptor.displayLevel >= 0 ? userDescriptor.displayLevel : DISPLAY_LEVEL.OTHER-1);
    setCode(initCode());
    navigate('/home');  
  }

  function initCode(): KidDevCode {
    if (displayLevel === DISPLAY_LEVEL.JUMP_NO_ATTR) {
      return ({code: [{statements: [{
        id: '1',
        name: StatementCode.JUMP
      }]}]});
    }  
    else if (displayLevel === DISPLAY_LEVEL.JUMP_READ_ONLY || displayLevel === DISPLAY_LEVEL.JUMP) {
      return ({code: [{statements: [{
        id: '1',
        name: StatementCode.JUMP,
        magnitude: 20
      }]}]});
    }
    else {
      return ({code: [{statements: [{
        id: '1',
        name: StatementCode.JUMP,
        magnitude: 100
      }]}]});
    }
  }

  return (
    <div className="app-page">
      <h1>מי אני?</h1>
      <div>
        {users.map((user: KidDevUserDescriptor) =>
          <img src={`./resources/users/${user.id}.png`} alt={user.id} height={100}
            className="app-clickable kd-user-card"
            onClick={() => openApp(user.id)}
            key={user.id}/>
        )}
      </div>
    </div>
  )
}