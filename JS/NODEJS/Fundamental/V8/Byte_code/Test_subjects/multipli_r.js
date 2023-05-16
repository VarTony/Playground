const multipli_r = (a, b, acc=0) => !b ? acc: multipli_r(a, --b, acc+a);

// Вызовы нужны для записи, так как записывется их исполнение.
multipli_r(2,5);