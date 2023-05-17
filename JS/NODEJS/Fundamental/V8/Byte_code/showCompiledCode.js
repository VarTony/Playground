const chilpProcess = require('node:child_process');


/**
 * 
 * @param { string } filename 
 * @param { string } funcName 
 * 
 * Записывает в создаваемые файлы байткод иследуемых функций:
 */
const execNodeScript = (nodeComand, filename, funcName, prefixFilename = '') => {
const outputFileName = `Outputs/${ prefixFilename + funcName }.txt`
chilpProcess.exec(
    `${ nodeComand }${ funcName } ./${ filename } > ${ outputFileName }`, 
    (_, stdout, err) => !err 
     ? console.log( `\b Answer writed in ${ outputFileName } file \n` )
     : console.log(`Error: ${ err } \n`)
    );
}


const printLogOfOptFunc = `node --allow-natives-syntax --print-opt-code --print-opt-code-filter=`; 
const printAllLog = `node --allow-natives-syntax --log-all --print-opt-code --print-opt-code-filter=`;
const printBytecode = `node --print-bytecode --print-bytecode-filter=`;

/**
 * Созданный файл(isolate-0x0000000-0000-V8.log) можно загрузить на 
 *  https://v8.github.io/tools/head/system-analyzer/ для детального рассмотрения
 *  исполнения процедуры
 * 
 *  Присутствует небольшой сайд эффект который создает llLogOptCodeOf_multipli.txt
 *  но он не должен влиять на конечную работу так как сразу же перезаписывается; 
 */
execNodeScript(printAllLog, 'Test_subjects/multipliForOptimize.js', 'multipli', 'allLogOptCodeOf_');

/**
 *  Вывод машинного кода после обработки компилятора V8 (TurboFan)
 *  JIT - Компилятор: TurboFan, интерпретатор: Ignition;
 */
execNodeScript(printLogOfOptFunc, 'Test_subjects/multipliForOptimize.js', 'multipli', 'allLogOptCodeOf_');

/**
 * Вывод байткода после обработки интерпретатором V8 (Ignition).
 * Интересную разницу можно заметить между рекурсивной и простой функцией умножения двух чисел.
 */
execNodeScript(printBytecode, 'Test_subjects/sum.js', 'sum');
execNodeScript(printBytecode, 'Test_subjects/multipli.js', 'multipli');
execNodeScript(printBytecode, 'Test_subjects/multipli_r.js', 'multipli_r');