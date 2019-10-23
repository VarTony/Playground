#!/bin/bash

#if[$# -gt 0]
#then
nameCompiledFile = ${1::-2} 
gcc $1 -o ./compiled_files/$nameCompiledFile
echo Файл скомпилирован: /compiled_files/$nameCompiledFile 
#else echo Первым параметром нужно указать имя файла
#fi
