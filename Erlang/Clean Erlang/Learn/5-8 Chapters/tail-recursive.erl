-module(tail_recursive).
-export([fack/1, len/1, duplicate/2, reverse/1]).

fack(N) -> fack(N, 1).
fack(0, Acc) -> Acc;
fack(N, Acc) when N > 0 -> fack(N-1, N*Acc).

len(List) -> len(List, 0).
len([], Acc) -> Acc;
len([_|Tail], Acc) -> len(Tail, Acc+1).

duplicate(N, Term) -> duplicate(N, Term, []).
duplicate(0, _, Acc) -> Acc;
duplicate(N, Term, Acc) when N > 0 -> duplicate(N-1, Term, [Term|Acc]).

reverse(List) -> reverse(List, []).
reverse([], Acc) -> Acc;
reverse([H|T], Acc) -> reverse(T,[H|Acc]).