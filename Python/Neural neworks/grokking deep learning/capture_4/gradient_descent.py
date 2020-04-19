weight = 0.5 
goal_pred = 0.8
input = 0.5

for iteration in range(1000):
  pred = input * weight
  error = (pred - goal_pred) ** 2
  direction_and_amount = (pred - goal_pred) * input #Main 
  weight = weight - direction_and_amount
  
  print('Error: ' + str(error) + 'Pred: ' + str(pred))
