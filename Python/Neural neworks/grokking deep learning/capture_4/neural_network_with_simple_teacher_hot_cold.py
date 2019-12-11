


def neural_network_with_simple_teacher(input, weight, goal):
  error = 1
  step_amount = 0.000001
  output = 0

  while True:
    output = input * weight
    error = (output - goal)

    up_prediction = input * (weight + step_amount)
    up_error = (up_prediction - goal) ** 2 

    down_prediction = input * (weight - step_amount)
    down_error = (down_prediction - goal) ** 2 
    
    if error <= step_amount: return output
    
    if down_error < up_error: weight -= step_amount
    if down_error > up_error: weight += step_amount


result = neural_network_with_simple_teacher(input, weight, goal)

print('Target: ', goal, 'result: ', result)