-module(factorial).

export([do/1])

do(N) -> when !N -> 1;
do(N)  when N >= 0 -> (N * do(N - 1)).