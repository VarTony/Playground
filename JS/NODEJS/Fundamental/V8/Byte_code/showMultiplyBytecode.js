const chilpProcess = require('node:child_process');


/**
 * 
 * @param { string } filename 
 * @param { string } funcName 
 * 
 * Записывает в создаваемые файлы байткод иследуемых функций:
 */
const printBytecode = (filename, funcName) => {
const outputFileName = `Outputs/${ funcName }.txt`
chilpProcess.exec(
    `node --print-bytecode --print-bytecode-filter=${ funcName } ./${ filename } > ${ outputFileName }`, 
    (_, stdout) => console.log(
        '\b Answer also writed in output.txt file \n'
        ,  stdout
        )
    );
}


/**
 * Интересную разницу можно заметить между рекурсивной и простой функцией умножения двух чисел 
 */
printBytecode('Test_subjects/sum.js', 'sum');
printBytecode('Test_subjects/multipli.js', 'multipli');
printBytecode('Test_subjects/multipli_r.js', 'multipli_r');