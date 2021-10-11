-module(boolean_operations).

% !!! true and false is atoms in Erlang

% true
1 and 1.
% true
1 or 0.
% false
false xor false.
% true
not true xor true.

% true because any atom bigest any number
true > 100000000000000.
% false
100 >= 500.
% true
100 =< 500.
% true.
1 < false.

% y = x(true)
1 =:= 1.
% y ~ x(true)
5 == 5.0.
% y != x(false)
1 =/= 1.
% y !~ x(false)
5 /= 5.0.
