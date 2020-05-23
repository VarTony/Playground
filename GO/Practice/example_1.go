package main

import "fmt"

func f(x int64) int64 {
  x += ((x * x) - (x * 2));
  
  return x;
}

var y = f(32);

func main() {
  fmt.Println(y)
}


