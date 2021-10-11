-module(guards).

-export([right_age/1]).

right_age(X) when X >= 18, X =< 98 ->
  'Капитан, в два счетчика!';
right_age(_) ->
  'Вы сегодня никуда не едите'.





% -module(composition).

% -import(functional_three,[map/2]).
% -import(animal_module,[what_animal_sounds/2]).
%
% -export([output/1]).
%
% %Разобраться лучше по ходу чтения
%
% output() ->
%  AnimalList = [cat, dog, people, cow].
%  % map = fun functional_three:map/2.
%  animalDetecter = fun animal_module:what_animal_sounds/1.
%  SoundsOfAnimal = map(AnimalList, fun animalDetecter/1).
%  io.format(SoundsOfAnimal)
