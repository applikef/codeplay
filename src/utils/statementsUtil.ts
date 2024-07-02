import { KDCode, KDCodeBlock, KDCodeStatement } from "./../model/kidDevModel";

export function updateCodeStatement(code: KDCode, newStatement: KDCodeStatement): KDCode {
    for (let i = 0; i < code.code.length; i++) {
        let block: KDCodeBlock = code.code[i];
        for (let j = 0; j < block.statements.length; j++) {
            let s: KDCodeStatement = block.statements[j];
            if (s.id === newStatement.id) {
                block.statements[j] = newStatement;
            }
        }
    }
    return code;
};

export function addStatement(code: KDCode, newStatement: KDCodeStatement): KDCode {
    code.code[code.code.length-1].statements.push(newStatement);
    return code;
};
