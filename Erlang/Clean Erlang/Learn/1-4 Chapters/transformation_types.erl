-module(transformation_types).
-import(io, [format/1]).
-export([do/0]).

do() ->
    Sample_1 = erlang:list_to_integer([50, 51]),
    Sample_2 = erlang:integer_to_list(51),
    Sample_3 = erlang:list_to_float("52.37"),
    Sample_4 = erlang:atom_to_list(true),
    Sample_5 = erlang:list_to_bitstring("Test"),
    
    Original_list = [[50, 51], 51, "52.37", true, "Test"],
    Results = [
        Sample_1,
        Sample_2,
        Sample_3,
        Sample_4,
        Sample_5
    ],

    io:format("Original list and results transformation: ~n"),

    [ Original_list, Results ].

