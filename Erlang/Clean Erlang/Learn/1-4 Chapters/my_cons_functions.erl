-module(my_cons_functions).
-export([head/1, second/1]).

head([Hd|_]) -> Hd.
second([_,Sc|_]) -> Sc.

