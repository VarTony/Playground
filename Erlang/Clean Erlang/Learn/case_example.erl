-module(case_example).

-export([beach/1]).


beach(Temperature) ->
  case Temperature of
    {celsius, X} when X >= 21, X =< 35 ->
      'Комфортная температура';

    {kelvin, X} when X >= 293, X =< 318  ->
      'Ученные доказали, что эта температура комфортна';

    {fahrenheit, X} when X >= 68, X =< 113 ->
      'Эта температура не угнетает темнокожих и снежков';

    _ -> 'Купаться сегодня не лучшая затея.'
  end.
