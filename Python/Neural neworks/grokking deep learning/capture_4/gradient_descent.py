weight = 10
goal_pred = 112
input = 0.5

for iteration in range(100):
  pred = input * weight
  proto_error = pred - goal_pred
  error = proto_error if proto_error > 0 else proto_error * -1
  direction_and_amount = (pred - goal_pred) #* input #Main 
  print('Weight: ' + str(weight), 'Direction_and_amount: ' + str(direction_and_amount))
  weight = weight - direction_and_amount
  
  print('Error: ' + str(error) + 'Pred: ' + str(pred))
