%-export([func1/arnost1, func2/arnost2... funcN/arnostN]).
-module(sample_module).
-export([add/2, say_hello_erlang/0]).

add(A,B) -> A+B.

say_hello_erlang() -> io:format('Hello.~n').