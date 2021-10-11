-module(functional_three).
-export([map/2, filter/2]).

%functional_three:map([1,2,3,4,5,6,7,8], fun(N) -> N * 2.718281828 end).
map(List, Func) -> [Func(N) || N <- List]. 

%functional_three:filter([1,2,3,4,5,6,7,8,9,10,11,12], fun(N) -> N rem 3 =:= 0 end).
filter(List, Func) -> [N || N <- List, Func(N)]. 
