-module(animal_module).
-export([what_tell_animal/1]).

what_tell_animal(Animal) -> 
	Answer = if Animal == dog -> "bark";
				Animal == cat -> "meow";
				Animal == cow -> "mooo";
				true -> "I don`t know who this is"
			end,
	[Animal, " talk " ++ Answer ++ "."].
