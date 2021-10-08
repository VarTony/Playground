-module(animal_module).
-export([what_animal_sounds/1]).

what_animal_sounds(Animal) ->
	Answer = if Animal == dog -> "woof";
				Animal == cat -> "meow";
				Animal == cow -> "mooo";
				true -> "I don`t know who this is"
			end,
	[Animal, " goes " ++ Answer ++ "."].
