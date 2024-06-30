import React, { useState } from 'react';
import { KDCode, KDCodeStatement, KDPencil } from './kidDevModel';
import { updateCodeStatement } from '../utils/statementsUtil';
import { DEFAULT_PENCIL_POSITION } from '../constants/displayConstants';

export type KDContextType = {
  displayLevel: number;
  pencil: KDPencil;
  code: KDCode;
  stroke: string;

  setDisplayLevel: (newValue: number) => void;
  setCode: (newCode: KDCode) => void;
  setCodeStatement: (newStatement: KDCodeStatement) => void;
  setPencil: (penX: number, penY: number) => void;
  setStroke: (newStroke: string) => void;
};

const KDContext = React.createContext<KDContextType | null>(null);

export const KidDevProvider: React.FC<React.PropsWithChildren> = ({
  children,
}) => {

  const [displayLevel, setDisplayLevelState] = useState<number>(0);
  const setDisplayLevel = (newValue: number) => {
    setDisplayLevelState(() => newValue);
  }

  const [code, setCodeState] = useState<KDCode>({code: []});
  const setCode = (newCode: KDCode) => {
    setCodeState(newCode);
  }
  const setCodeStatement = (newStatement: KDCodeStatement) => {
    const newCode: KDCode = updateCodeStatement(code, newStatement);
    setCodeState(newCode);
  }

  const [pencil, setPencilState] = useState<KDPencil>(DEFAULT_PENCIL_POSITION);
  const setPencil = (penX: number, penY: number) => {
    setPencilState({
      x: penX - 62,
      y: penY - 116,
      penX: penX,
      penY: penY
    });
  }
  
  const [stroke, setStrokeState] = useState<string>("blue");
  const setStroke = (newStroke: string) => {
    setStrokeState(newStroke);
  }

  return (
    <KDContext.Provider
      value={{
        displayLevel,
        pencil,
        code,
        stroke,
        setDisplayLevel,
        setPencil,
        setCode,
        setCodeStatement,
        setStroke
      }}
    >
      {children}
    </KDContext.Provider>
  );
};

export default KDContext;
