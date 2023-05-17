const multipli = require('./multipli');

// multipli(2, 5);
/**
 * 1. Гарантирует защиту от сборщика муссора.
 * 2. Флаг для оптимизатора.
 * Раскомментировать перед использованием
 */
// %PrepareFunctionForOptimization(multipli); // 1
// %OptimizeFunctionOnNextCall(multipli);     // 2
multipli(2, 5);