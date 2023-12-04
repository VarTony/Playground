weight = 0.1
number_of_toes = [8.5, 9.5, 10, 9]

def very_simple_neural_network(input, weight):
  return (input * weight)

get_percent = lambda num: str(num * 100) + '%'

input = number_of_toes[0]
pred = very_simple_neural_network(input, weight)
percent = get_percent(pred)

print(percent)

