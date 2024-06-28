import React, { useState } from 'react';
import { KDCode, KDCodeStatement } from './kidDevModel';
import { updateCodeStatement } from '../utils/statementsUtil';

export type KDContextType = {
  displayLevel: number;
  code: KDCode;
  penX: number;
  penY: number;
  pencilX: number;
  pencilY: number;
  stroke: string;

  setDisplayLevel: (newValue: number) => void;
  setCode: (newCode: KDCode) => void;
  setCodeStatement: (newStatement: KDCodeStatement) => void;
  setPenX: (x: number) => void;
  setPenY: (y: number) => void;
  setPencilX: (x: number) => void;
  setPencilY: (y: number) => void;
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

  const [pencilX, setPencilXState] = useState<number>(100);
  const [pencilY, setPencilYState] = useState<number>(100);
  const [penX, setPenXState] = useState<number>(pencilX + 62);
  const [penY, setPenYState] = useState<number>(pencilY + 116);
  const setPencilX = (x: number) => {
    setPencilXState(x);
  }
  const setPencilY = (y: number) => {
    setPencilYState(y);
  }
  const setPenX = (x: number) => {
    setPenXState(x);
  }
  const setPenY = (y: number) => {
    setPenYState(y);
  }
  
  const stroke = "blue";

  return (
    <KDContext.Provider
      value={{
        displayLevel,
        code,
        penX,
        penY,
        pencilX,
        pencilY,
        stroke,
        setDisplayLevel,
        setCode,
        setCodeStatement,
        setPenX,
        setPenY,
        setPencilX,
        setPencilY
      }}
    >
      {children}
    </KDContext.Provider>
  );
};

export default KDContext;
