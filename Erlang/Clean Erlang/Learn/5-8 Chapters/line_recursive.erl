-module(line_recursive).
-export([fack/1, len/1, duplicate/2, reverse/1]).


fack(0) -> 1;
fack(N) when N > 0 -> (N * fack(N - 1)).

len([]) -> 0;
len([_|Tail]) -> 1 + len(Tail).

duplicate(0, _) -> [];
duplicate(N, Term) when N > 0 -> [Term|duplicate(N-1, Term)]. % -> [Term, duplicate(N-1, Term)].

reverse([]) -> [];
reverse([H|T]) -> reverse(T)++[H].


